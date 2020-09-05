import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
