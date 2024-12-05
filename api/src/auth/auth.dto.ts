import { ApiProperty } from '@nestjs/swagger';


class LoginDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}

export {LoginDto}