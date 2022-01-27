import { InputType, Field, Int } from 'type-graphql'
import { GraphQLBigInt } from 'graphql-scalars'
import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator'

@InputType()
export class DTOStudentCreate {
  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  name: string

  @Field((type) => GraphQLBigInt)
  @IsNotEmpty()
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
  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number
}

@InputType()
export class DTOStudentUpdate {
  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  name: string

  @Field((type) => GraphQLBigInt)
  @IsNotEmpty()
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
