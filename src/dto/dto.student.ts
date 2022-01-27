import { InputType, Field } from 'type-graphql'
import { GraphQLBigInt } from 'graphql-scalars'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class DTOStudent {
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
