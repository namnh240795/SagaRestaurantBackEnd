import { JwtAuthGuard } from './../jwt-auth.guard';
import { AssignTasksDto } from './dtos/assign-tasks.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TasksService } from './tasks.service';
import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dtos/create-task.dto';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { FilterAssignedDto } from './dtos/filter-assigned.dto';
import { AuthUser } from 'src/AuthUser.decorator';
import { RolesGuard } from 'src/role.guard';
import { Roles } from 'src/Roles.decorator';

@ApiTags('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Roles('MANAGER')
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Roles('MANAGER')
  @Post('/batch')
  async createTasks(@Body() createTasksDto: CreateTasksDto) {
    return this.tasksService.batch(createTasksDto);
  }

  @Roles('STAFF')
  @Get('/assigned')
  async getAssignedTasksByIdUser(
    @Query() query: FilterAssignedDto,
    @AuthUser() user: any,
  ) {
    return this.tasksService.getByIdUser(query, user);
  }

  @Roles('MANAGER')
  @Post('/assign')
  async assignTasks(@Body() assignTasksDto: AssignTasksDto) {
    return this.tasksService.assignTasks(assignTasksDto);
  }

  @Roles('MANAGER')
  @Get('/statistic/unassigned')
  async statisticUnAssigned() {
    return this.tasksService.getUnAssignedTask();
  }

  @Roles('MANAGER', 'STAFF')
  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Roles('MANAGER')
  @Delete(':id')
  async removeTask(@Param('id') id: string) {
    return this.tasksService.removeTask(id);
  }

  @Roles('MANAGER')
  @Get('/search')
  async searchTask(@Query('nextPage') nextPage: string) {
    return this.tasksService.search(nextPage);
  }
}
