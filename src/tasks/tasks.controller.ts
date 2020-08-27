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
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dtos/create-task.dto';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
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
  async searchTask() {
    return this.tasksService.search();
  }
}
