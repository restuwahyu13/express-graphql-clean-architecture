import { ExpressContext as Context } from 'apollo-server-express'
import { IncomingHttpHeaders } from 'http'
import { JwtPayload } from 'jsonwebtoken'
import { ResolverData } from 'type-graphql'
import status from 'http-status'

import { graphqlError } from '@/helpers/helper.gqlError'
import { JsonWebToken } from '@/libs/lib.jwt'
import { ModelUser } from '@/models/model.user'
import { gqlResponse } from '@/helpers/helper.gqlResponse'

export async function permission({ context }: ResolverData, roles: string[]): Promise<any> {
  try {
    const IncomingRequest: Context = context as Context
    const headers: IncomingHttpHeaders = IncomingRequest.req.headers
    const accessToken: string | undefined = (headers.authorization as any).split('Bearer ')[1]
    const decodedToken: Record<string, any> | string | JwtPayload = JsonWebToken.verify(accessToken)

    const checkUserRole: ModelUser = await ModelUser.query().findById(decodedToken['id']).first()
    if (roles.includes(checkUserRole.role)) return true
    else throw gqlResponse(status.FORBIDDEN, 'Role permission access denied')
  } catch (e: any) {
    throw graphqlError(e.stat_code || status.FORBIDDEN, e.stat_msg || e.message)
  }
}
