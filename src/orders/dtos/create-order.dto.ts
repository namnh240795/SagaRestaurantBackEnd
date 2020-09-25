import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty()
  idProductSize: string;

  @ApiProperty()
  productSize: string;

  @ApiProperty()
  idProductColor: string;

  @ApiProperty()
  productColor: string;

  @ApiProperty()
  basePrice: number;

  @ApiProperty()
  sellPrice: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  idProductType: string;

  @ApiProperty()
  productType: string;

  @ApiProperty()
  quantity: number;
}

class TagDto {
  @ApiProperty()
  idTag: string;

  @ApiProperty()
  tagName: string;

  @ApiProperty()
  tagColor: string;
}

@ApiExtraModels(OrderItemDto)
class OrderDto {
  @ApiProperty()
  idCreator: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  guestName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  note: string;

  @ApiProperty()
  deliveryCost: number;

  @ApiProperty()
  deliveryTime: string;

  @ApiProperty()
  paymentType: string;

  @ApiProperty({
    type: [OrderItemDto],
  })
  items: OrderItemDto[];
}

@ApiExtraModels(TagDto)
export class CreateOrderDto {
  @ApiProperty()
  order: OrderDto;

  @ApiProperty({ type: [TagDto] })
  tags: TagDto[];
}
