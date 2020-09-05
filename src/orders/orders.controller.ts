import { UpdateOrderDto } from './dtos/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dtos/create-order.dto';
import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Param,
  Put,
  // UseGuards
} from '@nestjs/common';
import { OrdersService } from './orders.service';
// import { AuthGuard } from 'src/auth.guard';

@ApiTags('orders')
@Controller('orders')
// @UseGuards(AuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Delete()
  async deleteOrder(id: string) {
    return this.ordersService.removeOrder(id);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }
}
