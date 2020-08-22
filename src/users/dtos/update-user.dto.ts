import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  newPassword: string;
}
