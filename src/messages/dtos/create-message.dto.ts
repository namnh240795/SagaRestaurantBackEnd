import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
