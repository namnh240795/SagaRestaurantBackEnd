import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

class TagDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  color: string;
}

@ApiExtraModels(TagDto)
export class UpdateTaskDto {
  @ApiProperty({ type: [TagDto] })
  tags: TagDto[];

  @ApiProperty()
  idsTag: string[];
}
