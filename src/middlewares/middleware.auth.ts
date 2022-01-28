import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql'
import { IncomingHttpHeaders } from 'http'
import status from 'http-status'
import { assert } from 'is-any-type'
import { JwtPayload } from 'jsonwebtoken'

import { gqlResponse } from '@helpers/helper.gqlResponse'
import { JsonWebToken } from '@libs/lib.jwt'
import { ModelUser } from '@models/model.user'
import { ExpressContext } from 'apollo-server-express'
import { gqlError } from '@helpers/helper.gqlError'

export class Auth implements MiddlewareInterface {
  async use({ context }: ResolverData, next: NextFn): Promise<any> {
    try {
      const IncomingRequest: ExpressContext = context as ExpressContext
      let headers: IncomingHttpHeaders = IncomingRequest.req.headers

      if (!Object.keys(headers).includes('authorization')) throw gqlResponse(status.UNAUTHORIZED, 'Authorization is required')

      const authorization: boolean | undefined = (headers.authorization as any).includes('Bearer')
      if (!authorization) throw gqlResponse(status.UNAUTHORIZED, 'Bearer is required')

      const accessToken: string | undefined = (headers.authorization as any).split('Bearer ')[1]
      if (assert.isUndefined(accessToken as any)) throw gqlResponse(status.UNAUTHORIZED, 'Access Token is required')

      const isJsonWebToken: string[] = (accessToken as string).split('.')
      if (isJsonWebToken?.length !== 3) throw gqlResponse(status.UNAUTHORIZED, 'JWT token is not valid')

      const decodedToken: Record<string, any> | string | JwtPayload = JsonWebToken.verify(accessToken)
      if (assert.isPromise(decodedToken as any)) throw gqlResponse(status.UNAUTHORIZED, 'Access token expired')

      // set global request data
      const getUser: ModelUser = await ModelUser.query().findById(decodedToken['id']).andWhere('role', decodedToken['role']).first()
      Object.assign(IncomingRequest.req, { user: getUser })

      // goto to next step
      await next()
    } catch (e: any) {
      throw gqlError(e.start_code || status.UNAUTHORIZED, e.stat_msg || e.message)
    }
  }
}
