import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
