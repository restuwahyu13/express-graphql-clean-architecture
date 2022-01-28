import { Arg, Authorized, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { ExpressContext as Context } from 'apollo-server-express'

import { ServiceClassRoom } from '@services/service.classRoom'
import { DTOClassRoom, DTOClassRoomPagination as DTOPagination } from '@dto/dto.classRoom'
import { GraphqlResponse as Response, gqlResponse } from '@helpers/helper.gqlResponse'
import { gqlError } from '@helpers/helper.gqlError'
import { Auth } from '@middlewares/middleware.auth'

@Resolver()
export class ResolverClassRoom extends ServiceClassRoom {
  /**
   * @description QUERY RESOLVER TERITORY
   */

  @Query((returns) => Response)
  @UseMiddleware(Auth)
  @Authorized(['admin'])
  async resultsClassRoomResolver(@Arg('input') query: DTOPagination, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.resultsClassRoomService(query)
      return gqlResponse(res.stat_code, res.stat_msg, { results: res.data })
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Query((returns) => Response)
  @UseMiddleware(Auth)
  @Authorized(['admin'])
  async resultClassRoomResolver(@Arg('id') params: number, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.resultClassRoomService(params)
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
  async createClassRoomResolver(@Arg('input') body: DTOClassRoom, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.createClassRoomService(body)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => Response)
  @UseMiddleware(Auth)
  @Authorized(['admin'])
  async deleteClassRoomResolver(@Arg('id') params: number, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.deleteClassRoomService(params)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }

  @Mutation((returns) => Response)
  @UseMiddleware(Auth)
  @Authorized(['admin'])
  async updateClassRoomResolver(@Arg('id') params: number, @Arg('input') body: DTOClassRoom, @Ctx() ctx: Context): Promise<Response> {
    try {
      const res: Response = await super.updateClassRoomService(params, body)
      return gqlResponse(res.stat_code, res.stat_msg)
    } catch (e: any) {
      return gqlError(e.stat_code, e.stat_msg || e.message)
    }
  }
}
