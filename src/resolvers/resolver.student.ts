import { Arg, Authorized, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { ExpressContext as Context } from 'apollo-server-express'

import { ServiceStudent } from '@services/service.student'
import { DTOStudent, DTOStudentPagination as DTOPagination } from '@dto/dto.student'
import { GraphqlResponse as Response, gqlResponse } from '@helpers/helper.gqlResponse'
import { gqlError } from '@helpers/helper.gqlError'
import { Auth } from '@middlewares/middleware.auth'

@Resolver()
export class ResolverStudent extends ServiceStudent {
  /**
   * @description QUERY RESOLVER TERITORY
   */

  @Query((returns) => Response, { nullable: false })
  @UseMiddleware(Auth)
  @Authorized(['admin'])
  async resultsStudentResolver(@Arg('input') query: DTOPagination, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.resultsStudentService(query)
      return gqlResponse(res.stat_code, res.stat_msg, { results: res.data })
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Query((returns) => Response, { nullable: false })
  @UseMiddleware(Auth)
  @Authorized(['admin', 'student'])
  async resultStudentResolver(@Arg('id') params: number, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.resultStudentService(params)
      return gqlResponse(res.stat_code, res.stat_msg, { result: res.data })
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  /**
   * @description MUTATION RESOLVER TERITORY
   */

  @Mutation((returns) => Response, { nullable: false })
  @UseMiddleware(Auth)
  @Authorized(['admin'])
  async createStudentResolver(@Arg('input') body: DTOStudent, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.createStudentService(body)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => Response, { nullable: false })
  @UseMiddleware(Auth)
  @Authorized(['admin'])
  async deleteStudentResolver(@Arg('id') params: number, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.deleteStudentService(params)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      throw gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => Response, { nullable: false })
  @UseMiddleware(Auth)
  @Authorized(['admin'])
  async updateStudentResolver(@Arg('id') params: number, @Arg('input') body: DTOStudent, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.updateStudentService(params, body)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      throw gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }
}
