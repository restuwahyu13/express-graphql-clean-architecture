import { Query, Resolver } from 'type-graphql'
import status from 'http-status'

import { GraphqlResponse } from '@helpers/helper.gqlResponse'

@Resolver()
export class ResolverTeacher {
  /**
   * @description QUERY RESOLVER TERITORY
   */

  @Query((returns) => GraphqlResponse)
  async teacher(): Promise<GraphqlResponse> {
    const gqlResponse: GraphqlResponse = {
      stat_code: status.OK,
      stat_msg: 'Hello Wordl Teacher',
      data: {
        result: { name: 'john doe' }
      }
    }
    return gqlResponse
  }

  /**
   * @description MUTATION RESOLVER TERITORY
   */
}
