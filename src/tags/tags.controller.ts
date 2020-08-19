import { UpdateTagDto } from './dtos/update-tag.dto';
import { CreateTagDto } from './dtos/create-tag.dto';
import { Tag } from './interfaces/tag.interface';
import { TagsService } from './tags.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.updateTag(id, updateTagDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tagsService.removeTag(id);
  }

  @Get()
  async findAll(): Promise<Tag[]> {
    return this.tagsService.getTags();
  }
}
