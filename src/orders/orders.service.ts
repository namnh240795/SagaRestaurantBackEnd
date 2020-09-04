import { CreateOrderDto } from './dtos/create-order.dto';
import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Injectable()
export class OrdersService {
  createOrder(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
  }

  updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    console.log(updateOrderDto, id);
  }

  deleteOrder(id: string) {
    console.log(id);
  }

  getOrderById(id: string) {
    console.log(id);
  }

  search(limit: number, offset: number) {
    console.log(limit, offset);
  }
}
