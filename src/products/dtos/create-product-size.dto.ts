import { ApiProperty } from '@nestjs/swagger';

export class CreateProductSizeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  idProductType: string;
}
