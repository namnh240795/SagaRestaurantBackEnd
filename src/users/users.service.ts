import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserPasswordDto } from './dtos/update-user.dto';
import { User } from './interfaces/user.inteface';
import { Injectable } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const result = await FIREBASE_STORAGE_DB.collection('users').add(
      createUserDto,
    );
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
    return result.docs.map(user => ({ id: user.id, ...user.data() }));
  }
}
