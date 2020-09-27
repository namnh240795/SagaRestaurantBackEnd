import { strings } from 'src/strings';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dtos/update-order.dto';
import FIREBASE_STORAGE_DB from 'src/firebase';

@Injectable()
export class OrdersService {
  async createOrder(createOrderDto: CreateOrderDto, user: any) {
    const ordersRef = FIREBASE_STORAGE_DB.collection('orders');
    const tasksRef = FIREBASE_STORAGE_DB.collection('tasks');

    const addCreatorId = {
      ...createOrderDto,
      order: {
        ...createOrderDto.order,
        idCreator: user.id,
      },
    };
    const result = await ordersRef.add(addCreatorId);
    await tasksRef.doc(createOrderDto.idTask).update({
      idOrder: result.id,
    });

    return { data: result.id };
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const ordersRef = FIREBASE_STORAGE_DB.collection('orders').doc(id);

    const order = await ordersRef.get();
    if (!order.exists) {
      return strings.order.notFound;
    }

    await ordersRef.update(updateOrderDto);

    return strings.order.updateSuccess;
  }

  async removeOrder(id: string) {
    const orderRef = FIREBASE_STORAGE_DB.collection('orders').doc(id);

    const order = await orderRef.get();
    if (!order.exists) {
      return strings.order.notFound;
    }

    await orderRef.delete();

    return { data: strings.order.removeSuccess };
  }

  async getOrderById(id: string) {
    const orderRef = FIREBASE_STORAGE_DB.collection('orders').doc(id);

    const order = await orderRef.get();
    if (!order.exists) {
      return strings.order.notFound;
    }

    const orderInfo = order.data();

    return { data: { ...orderInfo, id: order.id } };
  }

  search(limit: number, offset: number) {
    console.log(limit, offset);
  }
}
