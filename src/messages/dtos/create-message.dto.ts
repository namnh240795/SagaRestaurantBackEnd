import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  insertedAt: string;

  @ApiProperty()
  idTask: string;
}
