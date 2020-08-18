import { UpdateUserPasswordDto } from './dtos/update-user.dto';
import { User } from './interfaces/user.inteface';
import { Injectable } from '@nestjs/common';
import { RemoveUserDto } from './dtos/remove-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
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

  search(): User[] {
    return this.users;
  }
}
