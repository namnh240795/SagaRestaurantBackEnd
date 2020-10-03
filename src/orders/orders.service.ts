import { strings } from 'src/strings';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dtos/update-order.dto';
import FIREBASE_STORAGE_DB from 'src/firebase';
import dayjs from 'dayjs';
import { FilterOrderDto } from './dtos/filter-order.dto';

@Injectable()
export class OrdersService {
  async createOrder(createOrderDto: CreateOrderDto, user: any) {
    const ordersRef = FIREBASE_STORAGE_DB.collection('orders');
    const tasksRef = FIREBASE_STORAGE_DB.collection('tasks');

    const addCreatorId = {
      ...createOrderDto,
      idCreator: user.id,
      order: {
        ...createOrderDto.order,
      },
      createdTime: dayjs(new Date()).unix() * 1000,
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

  async searchStaffOrder(filterOrderDto: FilterOrderDto, user: any) {
    let snapShot = FIREBASE_STORAGE_DB.collection('orders').where(
      'idCreator',
      '==',
      user.id,
    );

    const { nextPage, phoneNumber, idOrder, idsTag } = filterOrderDto;

    if (!!phoneNumber) {
      snapShot = snapShot.where('phone', '==', phoneNumber);
    }

    if (!!idOrder) {
      const result = await FIREBASE_STORAGE_DB.collection('orders')
        .doc(idOrder)
        .get();
      if (!result.id) {
        return { data: { list: [], nextPage: null } };
      }

      return {
        data: { list: [{ id: result.id, ...result.data() }], nextPage: null },
      };
    }

    if (idsTag) {
      if (typeof idsTag === 'string') {
        snapShot = snapShot.where('idsTag', 'array-contains-any', [idsTag]);
      } else {
        snapShot = snapShot.where('idsTag', 'array-contains-any', idsTag);
      }
    }

    if (nextPage) {
      const startAfterSnapshot = await FIREBASE_STORAGE_DB.collection('orders')
        .doc(nextPage)
        .get();

      snapShot = snapShot.startAfter(startAfterSnapshot);
    }

    const result = await snapShot.limit(10).get();

    if (result.docs.length <= 0) {
      return { data: { list: [], nextPage: null } };
    }

    return {
      data: {
        list: result.docs.map(order => {
          const orderInfo = order.data();
          return { id: order.id, ...orderInfo };
        }),
        nextPage: result.docs[result.docs.length - 1].id,
      },
    };
  }
}
