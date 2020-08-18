import { ApiProperty } from '@nestjs/swagger';

export class RemoveUserDto {
  @ApiProperty()
  username: string;
}
