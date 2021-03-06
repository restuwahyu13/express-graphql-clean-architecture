import { InputType, Field, Int } from 'type-graphql'
import { GraphQLBigInt } from 'graphql-scalars'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class DTOStudent {
  @Field((type) => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string

  @Field((type) => GraphQLBigInt, { nullable: false })
  @IsNotEmpty()
  npm: number

  @Field((type) => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  fakultas: string

  @Field((type) => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  kejuruan: string
}

@InputType()
export class DTOStudentPagination {
  @Field((type) => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  limit: number

  @Field((type) => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  offset: number
}
