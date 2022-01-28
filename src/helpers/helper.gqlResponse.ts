import { ObjectType, Field, Int, InterfaceType } from 'type-graphql'
import { GraphQLJSONObject } from 'graphql-scalars'
import { assert } from 'is-any-type'

@InterfaceType()
class IGraphqlResponse {
  @Field((type) => Int, { nullable: false })
  stat_code: number

  @Field((type) => String, { nullable: false })
  stat_msg: string

  @Field((type) => GraphQLJSONObject, { nullable: false })
  data?: Record<string, any> | Record<string, any>[]
}

@ObjectType({ implements: IGraphqlResponse })
export class GraphqlResponse {
  @Field((type) => Int, { nullable: false })
  stat_code: number

  @Field((type) => String, { nullable: false })
  stat_msg: string

  @Field((type) => GraphQLJSONObject, { nullable: false })
  data?: Record<string, any> | Record<string, any>[]
}

export const gqlResponse = (code: number, message: string, data?: any): GraphqlResponse => {
  if (assert.isNull(data as any)) {
    return {
      stat_code: code,
      stat_msg: message
    }
  } else {
    return {
      stat_code: code,
      stat_msg: message,
      data: data
    }
  }
}
