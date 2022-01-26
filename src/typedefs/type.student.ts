import { ObjectType, Field, Int, ID } from 'type-graphql'
import { GraphQLDate } from 'graphql-scalars'

@ObjectType()
class Student {
  @Field((type) => ID)
  id: string

  @Field((type) => String)
  name: string

  @Field((type) => Int)
  npm: number

  @Field((type) => String)
  fakultas: string

  @Field((type) => String)
  kejuruan: string

  @Field((type) => String)
  password: string

  @Field((type) => GraphQLDate)
  created_at?: Date

  @Field((type) => GraphQLDate)
  updated_at?: Date
}

@ObjectType()
class Pagination {
  @Field((type) => ID)
  limit: number

  @Field((type) => Int)
  offset: number
}

@ObjectType()
export class GraphqlResponse {
  @Field((type) => Int)
  stat_code: number

  @Field((type) => String)
  stat_msg: string

  @Field({ nullable: true })
  data?: Student

  @Field({ nullable: true })
  pagination?: Pagination
}
