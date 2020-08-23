import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
