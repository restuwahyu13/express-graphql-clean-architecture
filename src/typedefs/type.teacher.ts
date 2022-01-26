import { ObjectType, Field, Int, ID } from 'type-graphql'
import { GraphQLDate } from 'graphql-scalars'

@ObjectType()
class Teacher {
  @Field((type) => ID)
  id: string

  @Field((type) => Int)
  student_id: number

  @Field((type) => String)
  field_of_student: string

  @Field((type) => GraphQLDate)
  created_at?: Date

  @Field((type) => GraphQLDate)
  updated_at?: Date
}

@ObjectType()
class PaginationTeacher {
  @Field((type) => ID)
  limit: number

  @Field((type) => Int)
  offset: number
}

@ObjectType()
export class ResponseTeacher {
  @Field((type) => Int)
  stat_code: number

  @Field((type) => String)
  stat_msg: string

  @Field({ nullable: true })
  data?: Teacher

  @Field({ nullable: true })
  pagination?: PaginationTeacher
}
