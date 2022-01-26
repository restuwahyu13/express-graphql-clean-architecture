import { InputType, Field, Int } from 'type-graphql'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class DTOStudent {
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
