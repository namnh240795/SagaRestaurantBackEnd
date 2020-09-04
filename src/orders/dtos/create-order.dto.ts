import { ApiProperty } from '@nestjs/swagger';

class ItemDto {
  name: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
}

export class CreateOrderDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  note: string;

  @ApiProperty()
  items: Array<ItemDto>;
}
