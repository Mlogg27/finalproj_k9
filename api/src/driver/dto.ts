import {ApiProperty} from "@nestjs/swagger";



class RegisterDto {
  @ApiProperty({
    nullable: false,
    example: 'doanmanhlong2004@gmail.com'
  })
  email: string

  @ApiProperty({
    nullable: false,
    example: '0386658044'
  })
  phoneNumber: number

  @ApiProperty({
    nullable: false,
    example: 'ML27012004@he'
  })
  password: number
}

export {RegisterDto}