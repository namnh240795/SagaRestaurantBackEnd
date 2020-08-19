import { ApiProperty } from '@nestjs/swagger';

export class RemoveTagDto {
  @ApiProperty()
  id: string;
}
