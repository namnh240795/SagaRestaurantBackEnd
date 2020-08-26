import { bcrypt, SALT_ROUNDS } from 'src/configs';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserPasswordDto } from './dtos/update-user.dto';
import { User } from './interfaces/user.inteface';
import { Injectable, UseGuards } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';
import { strings } from 'src/strings';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, SALT_ROUNDS);
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
      return strings.user.notFound;
    }

    await userRef.delete();
    return strings.user.deleteSuccess;
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
