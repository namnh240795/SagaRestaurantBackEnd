import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  note: string;

  @ApiProperty()
  address: string;
}
