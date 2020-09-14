import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterAssignedDto {
  @ApiPropertyOptional()
  nextPage: string;
}
