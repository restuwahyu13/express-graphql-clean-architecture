import 'reflect-metadata'
import 'dotenv/config'
import 'express-http-error'
import { GraphQLError } from 'graphql'
import { NonEmptyArray, buildSchema } from 'type-graphql'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { Context, GraphQLRequestContext, GraphQLResponse, Config } from 'apollo-server-core'
import { graphqlUploadExpress as graphqlUpload } from 'graphql-upload'
import { bodyParserGraphQL as graphqlBodyParser } from 'body-parser-graphql'
import { applyMiddleware } from 'graphql-middleware'
import { isInstance as isApolloErrorInstance, formatError as formatApolloError } from 'apollo-errors'
import reusify from 'reusify'
import express, { Express, Request } from 'express'
import http, { Server } from 'http'
import Knex, { Knex as KnexDB } from 'knex'
import hpp from 'hpp'
import Objection from 'objection'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import zlib from 'zlib'
import path from 'path'
import rateLimit from 'express-rate-limit'
import SlowDown from 'express-slow-down'
import gracefulShutdown from 'http-graceful-shutdown'

import * as knexfile from '@/knexfile'
import { Winston } from '@libs/lib.winston'
import { permission } from '@middlewares/middleware.permission'

class App {
  private app: Express
  private server: Server
  private knex: KnexDB
  private resolvers: NonEmptyArray<string>
  private nodeEnv: boolean = process.env.NODE_ENV !== 'production' ? true : false

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
    this.resolvers = this.nodeEnv ? [path.join(__dirname, 'resolvers/**/*.ts')] : [path.join(__dirname, 'resolvers/**/*.js')]
  }

  private async middleware(): Promise<void> {
    this.app.use(graphqlBodyParser())
    this.app.use(hpp())
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(graphqlUpload({ maxFileSize: 5000000 }))
    this.app.use(
      cors({
        methods: ['GET', 'POST', 'PUT', 'PATCH'],
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
        max: 1000, // maximal request for all endpoint
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
  }

  private async apolloServer(): Promise<ApolloServer<ExpressContext>> {
    return new ApolloServer({
      schema: applyMiddleware(
        await buildSchema({
          resolvers: this.resolvers,
          skipCheck: false,
          authChecker: permission,
          dateScalarMode: 'timestamp',
          validate: {
            enableDebugMessages: this.nodeEnv ? true : false,
            strictGroups: true,
            forbidUnknownValues: true,
            skipMissingProperties: false,
            skipNullProperties: false,
            skipUndefinedProperties: false
          }
        })
      ),
      debug: this.nodeEnv ? true : false,
      introspection: true,
      stopOnTerminationSignals: true,
      parseOptions: {
        allowLegacySDLImplementsInterfaces: true,
        assumeValidSDL: true,
        experimentalFragmentVariables: true
      },
      formatResponse: (response: GraphQLResponse, requestContext?: GraphQLRequestContext): any => {
        if (this.nodeEnv && !response.errors) {
          Winston.loggerSuccess('GraphQLSuccess', response.data[Object.keys(response.data)[0]])
        }
      },
      formatError: (error: GraphQLError): any => {
        if (this.nodeEnv && isApolloErrorInstance(error.originalError)) {
          Winston.loggerError(error.name, error.originalError['data'])
        }
        return formatApolloError({
          name: error.name,
          data: error.originalError['data'],
          timestamp: error.extensions['exception']['time_thrown']
          // path: error.path,
          // locations: error.locations,
        })
      },
      context: (req: Context): Config<Request> => req
    })
  }

  private async run(): Promise<void> {
    const apollo: ApolloServer<ExpressContext> = await this.apolloServer()
    await apollo.start()
    apollo.applyMiddleware({ app: this.app })

    if (!this.nodeEnv) {
      gracefulShutdown(this.server.listen(process.env.PORT), {
        development: false,
        forceExit: true,
        timeout: 60000
      })
    } else {
      this.server.listen(process.env.PORT, () => {
        if (process.env.NODE_ENV !== 'production') console.info('Server running on port:', this.server.address()['port'])
      })
    }
  }

  public async main(): Promise<void> {
    this.connection()
    await this.config()
    await this.middleware()
    await this.run()
  }
}

/**
 * @description intialize app and run app with env development / staging / production
 */
;(async function () {
  await new App().main()
})()
