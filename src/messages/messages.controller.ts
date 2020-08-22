import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Controller('messages')
@UseGuards(AuthGuard)
export class MessagesController {}
