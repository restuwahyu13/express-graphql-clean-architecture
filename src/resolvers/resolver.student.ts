import { Query, Resolver } from 'type-graphql'
import status from 'http-status'

import { ServiceStudent } from '@services/service.student'
import { GraphqlResponse } from '@helpers/helper.gqlResponse'

@Resolver()
export class ResolverStudent extends ServiceStudent {
  /**
   * @description QUERY RESOLVER TERITORY
   */

  @Query((returns) => GraphqlResponse)
  async student(): Promise<GraphqlResponse> {
    const gqlResponse: GraphqlResponse = {
      stat_code: status.OK,
      stat_msg: 'Hello Wordl Student',
      data: {
        result: [{ name: 'john doe' }]
      }
    }
    return gqlResponse
  }

  /**
   * @description MUTATION RESOLVER TERITORY
   */
}
