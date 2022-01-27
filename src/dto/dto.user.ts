import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class DTOUserRegister {
  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  email: string

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  password: string

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  role: string
}

@InputType()
export class DTOUserLogin {
  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  email: string

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  password: string
}
