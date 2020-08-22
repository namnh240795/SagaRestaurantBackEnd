import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserPasswordDto } from './dtos/update-user.dto';
import { User } from './interfaces/user.inteface';
import { Injectable, UseGuards } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';

const bcrypt = require('bcrypt');
const saltRounds = 12;

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, saltRounds);
    const user = { ...createUserDto, password };
    const result = await FIREBASE_STORAGE_DB.collection('users').add(user);
    return result.id;
  }

  async updatePassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const userRef = FIREBASE_STORAGE_DB.collection('users').doc(id);
    const user = await userRef.get();
    if (!user.exists) {
      return 'Không tìm thấy nhãn';
    }

    await userRef.update({ password: updateUserPasswordDto.newPassword });

    return 'Cập nhật mật khẩu thành công';
  }

  async remove(id: string) {
    const userRef = FIREBASE_STORAGE_DB.collection('users').doc(id);
    const user = await userRef.get();
    if (!user.exists) {
      return 'Không tìm thấy nhãn';
    }

    await userRef.delete();
    return 'Xoá user thành công';
  }

  async search(): Promise<User[]> {
    const result = await FIREBASE_STORAGE_DB.collection('users')
      .limit(10)
      .get();

    return result.docs.map(user => {
      const userInfo = user.data();
      delete userInfo.password;
      return { id: user.id, ...userInfo };
    });
  }
}
