import { ApiProperty } from '@nestjs/swagger';

export class AssignTasksDto {
  @ApiProperty()
  idUser: string;

  @ApiProperty()
  numberOfTask: number;
}
