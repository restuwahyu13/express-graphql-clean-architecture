import { Query, Resolver } from 'type-graphql'
import status from 'http-status'

import { DAOControllerStudent } from '@dao/dao.student'
import { ResponseStudent } from '@typedefs/type.student'

@Resolver()
export class ResolverStudent implements DAOControllerStudent {
  /**
   * @description QUERY RESOLVER TERITORY
   */

  @Query((returns) => ResponseStudent)
  async student(): Promise<ResponseStudent> {
    const gqlResponse: ResponseStudent = {
      stat_code: status.OK,
      stat_msg: 'Hello Wordl Student'
    }
    return gqlResponse
  }

  /**
   * @description MUTATION RESOLVER TERITORY
   */
}
