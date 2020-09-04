import { ApiProperty } from '@nestjs/swagger';

export class CreateProductTypeDto {
  @ApiProperty()
  name: string;
}
