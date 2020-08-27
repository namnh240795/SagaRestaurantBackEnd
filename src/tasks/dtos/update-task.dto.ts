import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty()
  status: string;
}
