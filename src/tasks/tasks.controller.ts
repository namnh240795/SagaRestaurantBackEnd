import { UpdateTaskDto } from './dtos/update-task.dto';
import { TasksService } from './tasks.service';
import {
  Controller,
  UseGuards,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dtos/create-task.dto';
import { CreateTasksDto } from './dtos/create-tasks.dto';

@ApiTags('tasks')
@Controller('tasks')
// @UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Post('/batch')
  async createTasks(@Body() createTasksDto: CreateTasksDto) {
    return this.tasksService.batch(createTasksDto);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async removeTask(@Param('id') id: string) {
    return this.tasksService.removeTask(id);
  }

  @Get('/search')
  async searchTask(@Query('nextPage') nextPage: string) {
    return this.tasksService.search(nextPage);
  }
}
