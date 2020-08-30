import { bcrypt, SALT_ROUNDS } from 'src/configs';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserPasswordDto } from './dtos/update-user.dto';
import { Injectable } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';
import { strings } from 'src/strings';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const usersRef = FIREBASE_STORAGE_DB.collection('users');
    const users = await usersRef
      .where('username', '==', createUserDto.username)
      .get();

    if (!users.empty) {
      return { message: strings.user.usernameExists };
    }

    const password = await bcrypt.hash(createUserDto.password, SALT_ROUNDS);
    const user = { ...createUserDto, password };
    const result = await FIREBASE_STORAGE_DB.collection('users').add(user);

    return { data: result.id };
  }

  async updatePassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const userRef = FIREBASE_STORAGE_DB.collection('users').doc(id);
    const user = await userRef.get();
    if (!user.exists) {
      return strings.user.notFound;
    }

    const newPassword = await bcrypt.hash(
      updateUserPasswordDto.password,
      SALT_ROUNDS,
    );
    await userRef.update({ password: newPassword });

    return strings.user.updatePasswordSuccess;
  }

  async remove(id: string) {
    const userRef = FIREBASE_STORAGE_DB.collection('users').doc(id);
    const user = await userRef.get();
    if (!user.exists) {
      return { message: strings.user.notFound };
    }

    await userRef.delete();
    return { data: strings.user.deleteSuccess };
  }

  async search(): Promise<any> {
    const result = await FIREBASE_STORAGE_DB.collection('users').get();

    return {
      data: {
        list: result.docs.map(user => {
          const userInfo = user.data();
          delete userInfo.password;
          return { id: user.id, ...userInfo };
        }),
      },
    };
  }
}
