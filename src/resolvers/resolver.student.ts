import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'

import { ServiceStudent } from '@services/service.student'
import { DTOStudent } from '@dto/dto.student'
import { GraphqlResponse, gqlResponse } from '@helpers/helper.gqlResponse'
import { graphqlError } from '@helpers/helper.gqlError'
import { Auth } from '@middlewares/middleware.auth'

@Resolver()
export class ResolverStudent extends ServiceStudent {
  /**
   * @description QUERY RESOLVER TERITORY
   */

  @Query((returns) => GraphqlResponse)
  @UseMiddleware(Auth)
  async resultsStudentResolver(): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.resultsStudentService()
      return gqlResponse(res.stat_code, res.stat_msg, { results: res.data }, res.pagination)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Query((returns) => GraphqlResponse)
  async resultStudentResolver(@Arg('id') params: number): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.resultStudentService(params)
      return gqlResponse(res.stat_code, res.stat_msg, { result: res.data }, res.pagination)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  /**
   * @description MUTATION RESOLVER TERITORY
   */

  @Mutation((returns) => GraphqlResponse)
  async createStudentResolver(@Arg('input') payload: DTOStudent): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.createStudentService(payload)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => GraphqlResponse)
  async deleteStudentResolver(@Arg('id') params: number): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.deleteStudentService(params)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => GraphqlResponse)
  async updateStudentResolver(@Arg('id') params: number, @Arg('input') payload: DTOStudent): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.updateStudentService(params, payload)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }
}
