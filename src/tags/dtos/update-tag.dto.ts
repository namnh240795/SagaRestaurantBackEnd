import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
