import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;
}
