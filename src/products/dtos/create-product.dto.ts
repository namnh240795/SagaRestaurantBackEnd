import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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
}
