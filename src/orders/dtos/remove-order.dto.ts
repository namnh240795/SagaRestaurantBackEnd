import { ApiProperty } from '@nestjs/swagger';

export class RemoveOrderDto {
  @ApiProperty()
  username: string;
}
