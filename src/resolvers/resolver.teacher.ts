import { Query, Resolver } from 'type-graphql'
import status from 'http-status'

import { GraphqlResponse, IGraphqlResponse } from '@helpers/helper.gqlResponse'

@Resolver()
export class ResolverTeacher {
  /**
   * @description QUERY RESOLVER TERITORY
   */
  @Query((returns) => GraphqlResponse)
  teacher(): IGraphqlResponse {
    const gqlResponse: IGraphqlResponse = {
      stat_code: status.OK,
      stat_msg: 'Hello Wordl Teacher'
    }
    return gqlResponse
  }
}
