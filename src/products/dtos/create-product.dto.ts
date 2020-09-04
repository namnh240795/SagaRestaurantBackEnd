import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  idProductSize: string;

  @ApiProperty()
  idProductColor: string;

  @ApiProperty()
  basePrice: number;

  @ApiProperty()
  sellPrice: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  idProductType: string;
}
