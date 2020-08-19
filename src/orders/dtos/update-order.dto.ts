import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  amount: Number;

  @ApiProperty()
  note: string;

  @ApiProperty()
  address: string;
}
