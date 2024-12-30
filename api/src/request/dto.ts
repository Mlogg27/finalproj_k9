import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  type: string;
}
