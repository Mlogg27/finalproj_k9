import { ApiProperty } from '@nestjs/swagger';


class LoginDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}

class RefreshPassDto {
  @ApiProperty()
  email: string
}

export {LoginDto, RefreshPassDto}