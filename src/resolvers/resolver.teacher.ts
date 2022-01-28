import { Arg, Authorized, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { ExpressContext as Context } from 'apollo-server-express'

import { ServiceTeacher } from '@services/service.teacher'
import { DTOTeacher, DTOTeacherPagination as DTOPagination } from '@dto/dto.teacher'
import { GraphqlResponse as Response, gqlResponse } from '@helpers/helper.gqlResponse'
import { gqlError } from '@helpers/helper.gqlError'
import { Auth } from '@middlewares/middleware.auth'

@Resolver()
export class ResolverTeacher extends ServiceTeacher {
  /**
   * @description QUERY RESOLVER TERITORY
   */

  @Query((returns) => Response)
  @UseMiddleware(Auth)
  @Authorized(['admin', 'teacher'])
  async resultsTeacherResolver(@Arg('input') query: DTOPagination, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.resultsTeacherService(query)
      return gqlResponse(res.stat_code, res.stat_msg, { results: res.data })
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Query((returns) => Response)
  @UseMiddleware(Auth)
  @Authorized(['admin'])
  async resultTeacherResolver(@Arg('id') params: number, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.resultTeacherService(params)
      return gqlResponse(res.stat_code, res.stat_msg, { result: res.data })
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  /**
   * @description MUTATION RESOLVER TERITORY
   */

  @Mutation((returns) => Response)
  @UseMiddleware(Auth)
  @Authorized(['admin'])
  async createTeacherResolver(@Arg('input') body: DTOTeacher, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.createTeacherService(body)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => Response)
  @UseMiddleware(Auth)
  @Authorized(['admin'])
  async deleteTeacherResolver(@Arg('id') params: number, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.deleteTeacherService(params)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => Response)
  @UseMiddleware(Auth)
  @Authorized(['admin'])
  async updateTeacherResolver(@Arg('id') params: number, @Arg('input') body: DTOTeacher, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.updateTeacherService(params, body)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }
}
