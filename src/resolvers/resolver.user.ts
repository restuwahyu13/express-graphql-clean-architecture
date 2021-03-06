import { Arg, Mutation, Resolver } from 'type-graphql'

import { ServiceUser } from '@services/service.user'
import { DTOUserRegister, DTOUserLogin } from '@dto/dto.user'
import { GraphqlResponse as Response, gqlResponse } from '@helpers/helper.gqlResponse'
import { gqlError } from '@helpers/helper.gqlError'

@Resolver()
export class ResolverUser extends ServiceUser {
  /**
   * @description MUTATION RESOLVER TERITORY
   */

  @Mutation((returns) => Response, { nullable: false })
  async registerUserResolver(@Arg('input') body: DTOUserRegister): Promise<Response> {
    try {
      const res: Response = await super.registerUserService(body)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => Response, { nullable: false })
  async loginUserResolver(@Arg('input') body: DTOUserLogin): Promise<Response> {
    try {
      const res: Response = await super.loginUserService(body)
      return gqlResponse(res.stat_code, res.stat_msg, res.data)
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }
}
