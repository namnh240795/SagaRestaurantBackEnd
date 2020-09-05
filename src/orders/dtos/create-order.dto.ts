import { ApiProperty } from '@nestjs/swagger';
// class OrderItemDto {
//   product: {
//     idProductSize: string;
//     productSize: string;
//     idProductColor: string;
//     productColor: string;
//     basePrice: number;
//     sellPrice: number;
//     name: string;
//     idProductType: string;
//     productType: string;
//   };
//   quantity: number;
// }

// class TagDto {}

export class CreateOrderDto {
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

  @ApiProperty()
  tags: [];

  @ApiProperty()
  items: [];
}
