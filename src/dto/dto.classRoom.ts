import { InputType, Field, Int } from 'type-graphql'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class DTOClassRoom {
  @Field((type) => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  student_id: number

  @Field((type) => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  teacher_id: number

  @Field((type) => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  room_name: string
}

@InputType()
export class DTOClassRoomPagination {
  @Field((type) => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  limit: number

  @Field((type) => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  offset: number
}
