import { Query, Resolver } from 'type-graphql'
import status from 'http-status'

import { DAOControllerStudent } from '@dao/dao.student'
import { GraphqlResponse } from '@typedefs/type.student'

@Resolver()
export class ResolverStudent implements DAOControllerStudent {
  /**
   * @description QUERY RESOLVER TERITORY
   */

  @Query((returns) => GraphqlResponse)
  async student(): Promise<GraphqlResponse> {
    const gqlResponse: GraphqlResponse = {
      stat_code: status.OK,
      stat_msg: 'Hello Wordl Student'
    }
    return gqlResponse
  }

  /**
   * @description MUTATION RESOLVER TERITORY
   */
}
