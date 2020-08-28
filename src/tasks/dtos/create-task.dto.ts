import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  name: string;
}
