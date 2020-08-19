import { CreateOrderDto } from './dtos/create-order.dto';
import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Injectable()
export class OrdersService {
  createOrder(createOrderDto: CreateOrderDto) {}

  updateOrder(id: string, updateOrderDto: UpdateOrderDto) {}

  deleteOrder(id: string) {}

  getOrderById(id: string) {}

  search(limit: Number, offset: Number) {}
}
