import { InputType, Field, Int, ID } from 'type-graphql'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class DTOTeacherCreate {
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

@InputType()
export class DTOTeacherById {
  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number
}

@InputType()
export class DTOTeacherUpdate {
  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number

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
