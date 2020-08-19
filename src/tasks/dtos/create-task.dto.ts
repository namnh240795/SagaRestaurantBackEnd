import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
