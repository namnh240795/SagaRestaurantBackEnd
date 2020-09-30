import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterOrderDto {
  @ApiPropertyOptional()
  nextPage: string;

  @ApiPropertyOptional()
  idsTag: string[];

  @ApiPropertyOptional()
  phoneNumber: string;

  @ApiPropertyOptional()
  idOrder: string;
}
