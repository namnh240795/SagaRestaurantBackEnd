import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FilterAssignedDto {
  @ApiProperty()
  idUser: string;

  @ApiPropertyOptional()
  nextPage: string;
}
