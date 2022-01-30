# Express Graphql Clean Architecture

The following is a folder pattern for express graphql starterkit structure pattern that I usually use, so if you are interested in the pattern I made, you can use it if you think it's good.

## Table Of Content

- [What Are The Benefits](#what-are-the-benefits-)
- [Folder Structure Pattern](#folder-structure-pattern)
- [Folder Status And Description](#folder-status-and-description)
   + [Test](#tests)
   + [Configs](#configs)
   + [Dao](#dao)
   + [Databases](#databases)
   + [Dto](#dto)
   + [Helpers](#helpers)
   + [Interfaces](#interface)
   + [Libs](#libs)
   + [Middlewares](#middlewares)
   + [Models](#models)
   + [Resolvers](#resolvers)
   + [Typedefs](#typedefs)
   + [Services](#services)
   + [Crons](#crons)
- [Command](#command)
   + [Application Lifecycle ](#application-lifecycle)
   + [Docker Lifecycle](#docker-lifecycle)

## What Are The Benefits ?

- [x] Easy to maintance
- [x] Easy to scalable
- [x] Readable code
- [x] Suitable for large projects or small projects
- [x] Easy to understand for junior or senior
- [x] And more

## Folder Structure Pattern

```
├── tests
│   └── test.user.spec.ts
├── dao
│   └── dao.user.ts
├── dto
│   └── dto.user.ts
└── helpers
│   └── helper.gqlResponse.ts
└── middlewares
│   └── middleware.auth.ts
└── interfaces
│   └── interface.user.ts
└── models
│   └── model.user.ts
└── resolvers
│   └── resolver.user.ts
└── typedefs
│   └── type.user.ts
└── services
│   └── service.user.ts
└── libs
│   └── lib.jwt.ts
└── configs
│   └── pm2.config.js
└── databases
│   └── migrations
│   │     └── user_20210913.go // generate auto by cli using third party library
│   └── seeds
│   │     └── user_20210913.go // generate auto by cli using third party library
```

## Folder Status And Description

- #### Tests
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                             |
| --------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Tests*         | *Optional*        | *A collection of functions used to create a series of tests or run a test, be it unit testing or integration testing, which will later be used for the application itself.* |

- #### Configs
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                                         |
| --------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Configs*       | *Optional*        | *A collection of functions that contains all the configurations related to the application needs, such as .env or serverless.yml, which will later be used for the application itself.* |

- #### Dao
| **Folder Name** | **Folder Status** | **Description**                                                                                  |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| *Dao*           | *Optional*        | *A collection of functions used to define a name for a service so that resolvers can access it.* |

- #### Dto
| **Folder Name** | **Folder Status** | **Description**                                                                      |
| --------------- | ----------------- | ------------------------------------------------------------------------------------ |
| *Dto*           | *Required*        | *A collection of functions used to handle all requests body passed from the client.* |

- #### Helpers
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                            |
| --------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Helpers*       | *Optional*        | *A collection of functions used to create utilities for application purposes, such as customError or customResponse, which will later be used for the application itself.* |

- #### Interfaces
| **Folder Name** | **Folder Status** | **Description**                                                          |
| --------------- | ----------------- | ------------------------------------------------------------------------ |
| *Interfaces*    | *Required*        | *A collection of functions used to definition field property for model.* |


- #### Libs
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                   |
| --------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Libs*          | *Required*        | *A collection of functions that are used for the purpose of customizing a library into a separate function, which will later be used for the application itself.* |


- #### Middlewares
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                                                                                                           |
| --------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Middlewares*   | *Required*        | *A collection of functions that are used as a service for HTTP Requests such as authJWt, authRole, customLogger whether used per-route or used globally without the need to use them in each route, which will later be used for the application itself.* |  |

- #### Models
| **Folder Name** | **Folder Status** | **Description**                                                                                                                       |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| *Models*        | *Required*        | *A collection of functions used to represent the table structure in a database, which will later be used for the application itself.* |

- #### Resolvers
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                   |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Resolvers*     | *Required*        | *A collection of functions that are used to forward requests given by handlers to services, which will later be used for the application itself.* |

- #### Typedefs
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                                                |
| --------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Typedefs*      | *Optional*        | *A collection of functions used to pass the response you provide to the client from the service, which will later be used for the application itself, but if you are not use custom response.* |

- #### Services
| **Folder Name** | **Folder Status** | **Description**                                                                                                               |
| --------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| *Services*      | *Required*        | *A collection of functions that are used to interact with the database, which will later be used for the application itself.* |

- #### Crons
| **Folder Name** | **Folder Status** | **Description**                                                                                                                                                            |
| --------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Crons*         | *Optional*        | *A collection of functions that are used to trigger a desired function, according to the time specified by the user, which will later be used for the application itself.* |


- #### Databases
| **Folder Name** | **Folder Status** | **Description**                                                                                                                       |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| *Databases*     | *required*        | *A collection of functions used to create migrations or seeds for the database, which will later be used for the application itself.* |

## Command

- ### Application Lifecycle

  - Install node modules

  ```sh
  $ npm install
  ```

  - Build application

  ```sh
  $ npm run build || make build
  ```

  - Start application in development

  ```sh
  $ npm run dev | make dev
  ```

  - Start application in production

  ```sh
  $ npm run start || make start
  ```

* ### Docker Lifecycle

  - Build container

  ```sh
  $ docker-compose build | make dcb
  ```

  - Run container with flags

  ```sh
  $ docker-compose up -d --<flags name> | make dcu f=<flags name>
  ```

  - Run container build with flags

  ```sh
  $ docker-compose up -d --build --<flags name> | make dcubf f=<flags name>
  ```

  - Run container

  ```sh
  $ docker-compose up -d --build | make dcu
  ```

  - Stop container

  ```sh
  $ docker-compose down | make dcd
  ```

<p align="right" style="padding: 5px; border-radius: 100%; background-color: red; font-size: 2rem;">
  <b><a href="#express-graphql-clean-architecture">BACK TO TOP</a></b>
</p>
