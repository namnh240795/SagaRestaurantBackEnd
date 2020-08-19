import { ApiProperty } from '@nestjs/swagger';

export class RemoveTaskDto {
  @ApiProperty()
  username: string;
}
