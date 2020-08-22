import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {}
