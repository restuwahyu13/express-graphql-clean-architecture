import { InputType, Field, Int } from 'type-graphql'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class DTOTeacher {
  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  name: string

  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  student_id: number

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  field_of_student: string
}
