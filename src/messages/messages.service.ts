import { Message } from './interfaces/message.interface';
import { CreateMessageDto } from './dtos/create-message.dto';
import { Injectable } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';
import { strings } from 'src/strings';

@Injectable()
export class MessagesService {
  async create(createMessageDto: CreateMessageDto) {
    const result = await FIREBASE_STORAGE_DB.collection('messages').add(
      createMessageDto,
    );
    return result.id;
  }

  async search(): Promise<Message[]> {
    const result = await FIREBASE_STORAGE_DB.collection('messages')
      .limit(10)
      .get();

    return result.docs.map(message => {
      const messageInfo = message.data();
      return { id: message.id, ...messageInfo };
    });
  }
}
