import { UpdateUserPasswordDto } from './dtos/update-user.dto';
import { User } from './interfaces/user.inteface';
import { Injectable } from '@nestjs/common';
import { RemoveUserDto } from './dtos/remove-user.dto';
import FIREBASE_STORAGE_DB from 'src/firebase';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async create(user: User) {
    const result = await FIREBASE_STORAGE_DB.collection('ADMIN')
      .doc('users')
      .set(user);
    console.log('result', result);
  }

  updatePassword(updateUserPasswordDto: UpdateUserPasswordDto) {
    const user = this.users.find(
      e => e.username === updateUserPasswordDto.username,
    );
    if (user) {
      user.password = updateUserPasswordDto.password;
    }
  }

  remove(removeUserDto: RemoveUserDto) {}

  async search(): Promise<User[]> {
    const result = await FIREBASE_STORAGE_DB.collection('users')
      .limit(10)
      .get();

    result.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
    return this.users;
  }
}
