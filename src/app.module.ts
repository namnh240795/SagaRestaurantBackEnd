import { CatsModule } from './cats/cats.modules';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
