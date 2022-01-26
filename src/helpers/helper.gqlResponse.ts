import { Field, ObjectType } from 'type-graphql'

export interface IGraphqlResponse {
  stat_code: number
  stat_msg: string
  // data?: Record<string, any> | Array<Record<string, any>>
  // pagination?: Record<string, any>
}

@ObjectType()
export class GraphqlResponse implements IGraphqlResponse {
  @Field()
  stat_code: number

  @Field()
  stat_msg: string

  // @Field({ nullable: true })
  // data?: Record<string, any> | Array<Record<string, any>>

  // @Field({ nullable: true })
  // pagination?: Record<string, any>
}
