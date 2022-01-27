import { Arg, Mutation, Resolver } from 'type-graphql'

import { ServiceUser } from '@services/service.user'
import { DTOUserRegister, DTOUserLogin } from '@dto/dto.user'
import { GraphqlResponse, gqlResponse } from '@helpers/helper.gqlResponse'
import { graphqlError } from '@helpers/helper.gqlError'

@Resolver()
export class ResolverUser extends ServiceUser {
  /**
   * @description MUTATION RESOLVER TERITORY
   */

  @Mutation((returns) => GraphqlResponse)
  async registerUserResolver(@Arg('input') payload: DTOUserRegister): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.registerUserService(payload)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => GraphqlResponse)
  async loginUserResolver(@Arg('input') payload: DTOUserLogin): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.loginUserService(payload)
      return gqlResponse(res.stat_code, res.stat_msg, res.data, {})
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }
}
