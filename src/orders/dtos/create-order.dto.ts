import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
