import { Arg, Mutation, Query, Resolver } from 'type-graphql'

import { ServiceTeacher } from '@services/service.teacher'
import { DTOTeacher } from '@dto/dto.teacher'
import { GraphqlResponse, gqlResponse } from '@helpers/helper.gqlResponse'
import { graphqlError } from '@helpers/helper.gqlError'

@Resolver()
export class ResolverTeacher extends ServiceTeacher {
  /**
   * @description QUERY RESOLVER TERITORY
   */

  @Query((returns) => GraphqlResponse)
  async resultsTeacherResolver(): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.resultsTeacherService()
      return gqlResponse(res.stat_code, res.stat_msg, { results: res.data }, res.pagination)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Query((returns) => GraphqlResponse)
  async resultTeacherResolver(@Arg('id') params: number): Promise<GraphqlResponse> {
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
  async createTeacherResolver(@Arg('input') payload: DTOTeacher): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.createTeacherService(payload)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => GraphqlResponse)
  async deleteTeacherResolver(@Arg('id') params: number): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.deleteTeacherService(params)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => GraphqlResponse)
  async updateTeacherResolver(@Arg('id') params: number, @Arg('input') payload: DTOTeacher): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.updateTeacherService(params, payload)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }
}
