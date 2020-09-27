import { RolesGuard } from 'src/role.guard';
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
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { Roles } from 'src/Roles.decorator';
import { AuthUser } from 'src/AuthUser.decorator';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Roles('MANAGER', 'STAFF')
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @AuthUser() user: any,
  ) {
    return this.ordersService.createOrder(createOrderDto, user);
  }

  @Roles('MANAGER', 'STAFF')
  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Roles('MANAGER', 'STAFF')
  @Delete()
  async deleteOrder(id: string) {
    return this.ordersService.removeOrder(id);
  }

  @Roles('MANAGER', 'STAFF')
  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }
}
