import { ApiProperty } from '@nestjs/swagger';

export class CreateProductColorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  idProductType: string;
}
