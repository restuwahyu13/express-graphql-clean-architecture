import { Query, Resolver } from 'type-graphql'
import status from 'http-status'

import { DAOControllerTeacher } from '@dao/dao.teacher'
import { ResponseTeacher } from '@typedefs/type.teacher'

@Resolver()
export class ResolverTeacher implements DAOControllerTeacher {
  /**
   * @description QUERY RESOLVER TERITORY
   */

  @Query((returns) => ResponseTeacher)
  async teacher(): Promise<ResponseTeacher> {
    const gqlResponse: ResponseTeacher = {
      stat_code: status.OK,
      stat_msg: 'Hello Wordl Student'
    }
    return gqlResponse
  }

  /**
   * @description MUTATION RESOLVER TERITORY
   */
}
