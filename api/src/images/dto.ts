import {ApiProperty} from "@nestjs/swagger";



class RegisterDto {
  @ApiProperty({
    example: 'doanmanhlong2004@gmail.com'
  })
  email: string

  @ApiProperty({
    example: '0386658044'
  })
  phoneNumber: number

  @ApiProperty({
    example: 'ML27012004@he'
  })
  password: number
}

export {RegisterDto}