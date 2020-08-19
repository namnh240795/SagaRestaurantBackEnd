import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
