import { ApiProperty } from '@nestjs/swagger';

export class RemoveMessageDto {
  @ApiProperty()
  username: string;
}
