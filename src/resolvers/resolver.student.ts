import { Arg, Mutation, Query, Resolver } from 'type-graphql'

import { ServiceStudent } from '@services/service.student'
import { DTOStudentById, DTOStudentCreate, DTOStudentUpdate } from '@dto/dto.student'
import { GraphqlResponse, gqlResponse } from '@helpers/helper.gqlResponse'
import { graphqlError } from '@helpers/helper.gqlError'

@Resolver()
export class ResolverStudent extends ServiceStudent {
  /**
   * @description QUERY RESOLVER TERITORY
   */

  @Query((returns) => GraphqlResponse)
  async resultsStudentResolver(): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.resultsStudentService()
      return gqlResponse(res.stat_code, res.stat_msg, { results: res.data }, res.pagination)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Query((returns) => GraphqlResponse)
  async resultStudentResolver(@Arg('input') args: DTOStudentById): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.resultStudentService(args)
      return gqlResponse(res.stat_code, res.stat_msg, { result: res.data }, res.pagination)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  /**
   * @description MUTATION RESOLVER TERITORY
   */

  @Mutation((returns) => GraphqlResponse)
  async createStudentResolver(@Arg('input') args: DTOStudentCreate): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.createStudentService(args)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => GraphqlResponse)
  async deleteStudentResolver(@Arg('input') args: DTOStudentById): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.deleteStudentService(args)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => GraphqlResponse)
  async updateStudentResolver(@Arg('input') args: DTOStudentUpdate): Promise<GraphqlResponse> {
    try {
      const res: GraphqlResponse = await super.updateStudentService(args)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return graphqlError(e.stat_code, e.stat_msg || e.message)
    }
  }
}
