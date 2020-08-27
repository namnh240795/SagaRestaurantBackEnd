import { UpdateRoleDto } from './dtos/update-role.dto';
import { AuthGuard } from './../auth.guard';
import {
  Controller,
  UseGuards,
  Body,
  Post,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
@UseGuards(AuthGuard)
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.rolesService.removeRole(id);
  }

  @Get('/search')
  async search() {
    return this.rolesService.search();
  }
}
