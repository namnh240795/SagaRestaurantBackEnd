import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { TagsController } from './tags/tags.controller';
import { TagsService } from './tags/tags.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, OrdersController, TagsController, TasksController],
  providers: [AppService, UsersService, OrdersService, TagsService, TasksService],
})
export class AppModule {}
