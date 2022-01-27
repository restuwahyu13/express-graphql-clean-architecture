import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { ExpressContext } from 'apollo-server-express'

import { ServiceTeacher } from '@services/service.teacher'
import { DTOTeacher } from '@dto/dto.teacher'
import { GraphqlResponse, gqlResponse } from '@helpers/helper.gqlResponse'
import { graphqlError } from '@helpers/helper.gqlError'
import { Auth } from '@middlewares/middleware.auth'

@Resolver()
export class ResolverTeacher extends ServiceTeacher {
  /**
   * @description QUERY RESOLVER TERITORY
   */

  @Query((returns) => GraphqlResponse)
  @UseMiddleware(Auth)
  async resultsTeacherResolver(@Ctx() context: ExpressContext): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.resultsTeacherService()
      return gqlResponse(res.stat_code, res.stat_msg, { results: res.data }, res.pagination)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Query((returns) => GraphqlResponse)
  @UseMiddleware(Auth)
  async resultTeacherResolver(@Arg('id') params: number, @Ctx() context: ExpressContext): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.resultTeacherService(params)
      return gqlResponse(res.stat_code, res.stat_msg, { result: res.data }, res.pagination)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  /**
   * @description MUTATION RESOLVER TERITORY
   */

  @Mutation((returns) => GraphqlResponse)
  @UseMiddleware(Auth)
  async createTeacherResolver(@Arg('input') payload: DTOTeacher, @Ctx() context: ExpressContext): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.createTeacherService(payload)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => GraphqlResponse)
  @UseMiddleware(Auth)
  async deleteTeacherResolver(@Arg('id') params: number, @Ctx() context: ExpressContext): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.deleteTeacherService(params)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => GraphqlResponse)
  @UseMiddleware(Auth)
  async updateTeacherResolver(
    @Arg('id') params: number,
    @Arg('input') payload: DTOTeacher,
    @Ctx() context: ExpressContext
  ): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.updateTeacherService(params, payload)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }
}
