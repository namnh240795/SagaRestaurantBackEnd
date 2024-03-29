import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
class MessageDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  insertedAt: string;
}

@ApiExtraModels(MessageDto)
export class CreateTaskDto {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [MessageDto] })
  messages: MessageDto[];
}
