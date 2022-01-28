import { InputType, Field, Int } from 'type-graphql'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class DTOTeacher {
  @Field((type) => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string

  @Field((type) => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  field_of_study: string
}

@InputType()
export class DTOTeacherPagination {
  @Field((type) => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  limit: number

  @Field((type) => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  offset: number
}
