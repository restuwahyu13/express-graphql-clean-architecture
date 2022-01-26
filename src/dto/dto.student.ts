import { InputType, Field, Int, ID } from 'type-graphql'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class DTOStudentCreate {
  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  name: string

  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  npm: number

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  fakultas: string

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  kejuruan: string

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  password: string
}

@InputType()
export class DTOStudentById {
  @Field((type) => ID)
  @IsNotEmpty()
  @IsString()
  id: string
}

@InputType()
export class DTOStudentUpdate {
  @Field((type) => ID)
  @IsNotEmpty()
  @IsString()
  id: string

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  name: string

  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  npm: number

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  fakultas: string

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  kejuruan: string

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  password: string
}
