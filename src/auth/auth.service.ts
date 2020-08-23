import { LogInDto } from './dtos/log-in.dto';
import { Injectable } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';
import { bcrypt } from 'src/configs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(logInDto: LogInDto) {
    const usersRef = await FIREBASE_STORAGE_DB.collection('users');

    const users = await usersRef
      .where('username', '==', logInDto.username)
      .get();

    if (users.empty) {
      return 'Sai tên đăng nhập hoặc mật khẩu';
    }

    const user = users.docs.map(user => {
      const userInfo = user.data();
      return { id: user.id, ...userInfo };
    })[0];

    const matchPassword = await bcrypt.compare(
      logInDto.password,
      user.password,
    );

    if (!matchPassword) {
      return 'Sai tên đăng nhập hoặc mật khẩu';
    }

    delete user.password;
    const payload = { username: user.username, sub: user.userId };
    return this.jwtService.sign(payload);
  }
}
