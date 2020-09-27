import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterAssignedDto {
  @ApiPropertyOptional()
  nextPage: string;

  @ApiPropertyOptional()
  idsTag: string[];

  @ApiPropertyOptional()
  hasOrder: string;

  @ApiPropertyOptional()
  phone_numbers: string;
}
