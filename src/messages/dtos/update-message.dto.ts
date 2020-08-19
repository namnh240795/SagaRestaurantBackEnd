import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
