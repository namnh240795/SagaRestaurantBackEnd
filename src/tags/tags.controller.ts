import { RolesGuard } from 'src/role.guard';
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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { Roles } from 'src/Roles.decorator';

@ApiTags('tags')
@Controller('tags')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Roles('MANAGER')
  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }

  @Roles('MANAGER')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.updateTag(id, updateTagDto);
  }

  @Roles('MANAGER')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tagsService.removeTag(id);
  }

  @Roles('MANAGER')
  @Get('/search')
  async findAll(): Promise<Tag[]> {
    return this.tagsService.getTags();
  }
}
