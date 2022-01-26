import 'reflect-metadata'
import 'dotenv/config'
import 'express-http-error'
import { NonEmptyArray, buildSchema } from 'type-graphql'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { graphqlUploadExpress as graphqlUpload } from 'graphql-upload'
import { bodyParserGraphQL as graphqlBodyParser } from 'body-parser-graphql'
import { applyMiddleware } from 'graphql-middleware'
import reusify from 'reusify'
import express, { Express } from 'express'
import http, { Server } from 'http'
import Knex, { Knex as KnexDB } from 'knex'
import hpp from 'hpp'
import Objection from 'objection'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import zlib from 'zlib'
import rateLimit from 'express-rate-limit'
import SlowDown from 'express-slow-down'
import path from 'path'
import { Container } from 'typedi'

import * as knexfile from '@/knexfile'

class App {
  private app: Express
  private server: Server
  private knex: KnexDB

  constructor() {
    this.app = reusify(express).get() as Express
    this.server = http.createServer(this.app)
    this.knex = Knex(knexfile[process.env.NODE_ENV as string])
  }

  private connection(): KnexDB {
    Objection.Model.knex(this.knex)
    return this.knex
  }

  private async config(): Promise<void> {
    this.app.disabled('x-powered-by')
  }

  private async middleware(): Promise<void> {
    this.app.use(graphqlBodyParser())
    this.app.use(hpp())
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(graphqlUpload({ maxFileSize: 3000000 }))
    this.app.use(
      cors({
        methods: 'POST',
        allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
        credentials: true
      })
    )
    this.app.use(
      compression({
        strategy: zlib.constants.Z_RLE,
        level: zlib.constants.Z_BEST_COMPRESSION,
        memLevel: zlib.constants.Z_BEST_COMPRESSION
      })
    )
    this.app.use(
      rateLimit({
        windowMs: 24 * 60 * 3, // next request to endpoint
        max: 100, // maximal request for all endpoint
        message: 'To many request, send back request after 3 minutes'
      })
    )
    this.app.use(
      SlowDown({
        windowMs: 24 * 60 * 1, // next request to endpoint
        delayMs: 24 * 60 * 2000, // increment delay
        delayAfter: 100 // slow down after request
      })
    )
    if (process.env.NODE_ENV !== 'production') {
      this.app.use(morgan('dev'))
    }
  }

  private async apolloServer(): Promise<ApolloServer<ExpressContext>> {
    const resolversPath: NonEmptyArray<string> = [path.join(__dirname, 'resolvers/**/*.ts')]
    return new ApolloServer({
      introspection: false,
      schema: applyMiddleware(await buildSchema({ resolvers: resolversPath, skipCheck: false, container: Container })),
      formatError: ({ name, message, path }) => ({
        name,
        message: message.replace('Unexpected error value: ', ''),
        path
      })
    })
  }

  private async run(): Promise<void> {
    const apollo: ApolloServer<ExpressContext> = await this.apolloServer()
    await apollo.start()
    apollo.applyMiddleware({ app: this.app })
    this.server.listen(process.env.PORT, () => {
      if (process.env.NODE_ENV !== 'production') console.info('Server is running on port: ', process.env.PORT)
    })
  }

  public async main(): Promise<void> {
    this.connection()
    await this.config()
    await this.middleware()
    await this.run()
  }
}

/**
 * @description intialize app and run app development / production
 */
;(async function () {
  await new App().main()
})()
