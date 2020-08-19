import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
