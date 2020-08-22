import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {}
