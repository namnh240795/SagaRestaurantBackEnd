import { CreateMessageDto } from './dtos/create-message.dto';
import { Controller, UseGuards, Post, Body, Get } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { MessagesService } from './messages.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get('/search')
  async searchTask() {
    return this.messagesService.search();
  }
}
