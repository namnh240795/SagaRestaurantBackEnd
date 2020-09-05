import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { TasksModule } from './tasks/tasks.module';
import { MessagesModule } from './messages/messages.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    TagsModule,
    TasksModule,
    MessagesModule,
    RolesModule,
  ],
})
export class AppModule {}
