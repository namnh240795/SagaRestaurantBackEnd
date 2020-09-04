import {
  Controller,
  // UseGuards
} from '@nestjs/common';
// import { AuthGuard } from 'src/auth.guard';

@Controller('orders')
// @UseGuards(AuthGuard)
export class OrdersController {
  async createOrder() {
    return null;
  }

  async updateOrder() {
    return null;
  }

  async deleteOrder() {
    return null;
  }

  async getOrder() {
    return null;
  }
}
