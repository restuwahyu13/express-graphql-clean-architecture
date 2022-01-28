import { config } from 'dotenv'
import path from 'path'
import { Knex } from 'knex'

// load .env file outside src
config({ path: '../../.env' })

export const development: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: {
    min: 1,
    max: 5
  },
  migrations: {
    directory: path.resolve(__dirname, '../databases/migrations/')
  },
  seeds: {
    directory: path.resolve(__dirname, '../databases/seeds/')
  },
  log: {
    error: (msg: string | any): void => console.error(msg),
    warn: (msg: string | any): void => console.info(msg)
  }
}

export const staging: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: {
    min: 5,
    max: 10
  },
  migrations: {
    directory: path.resolve(__dirname, '../databases/migrations/')
  },
  seeds: {
    directory: path.resolve(__dirname, '../databases/seeds/')
  },
  log: {
    error: (msg: string | any): void => console.error(msg),
    warn: (msg: string | any): void => console.info(msg)
  }
}

export const production: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: {
    min: 10,
    max: 20
  },
  migrations: {
    directory: path.resolve(__dirname, '../databases/migrations/')
  },
  seeds: {
    directory: path.resolve(__dirname, '../databases/seeds/')
  },
  log: {
    error: (msg: string | any): void => console.error(msg),
    warn: (msg: string | any): void => console.info(msg)
  }
}

export const test: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: {
    min: 1,
    max: 5
  },
  migrations: {
    directory: path.resolve(__dirname, '../databases/migrations/')
  },
  seeds: {
    directory: path.resolve(__dirname, '../databases/seeds/')
  },
  log: {
    error: (msg: string | any): void => console.error(msg),
    warn: (msg: string | any): void => console.info(msg)
  }
}
