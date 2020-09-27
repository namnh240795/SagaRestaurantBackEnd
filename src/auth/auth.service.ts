import { LogInDto } from './dtos/log-in.dto';
import { Injectable } from '@nestjs/common';
import FIREBASE_STORAGE_DB from 'src/firebase';
import { bcrypt } from 'src/configs';
import { JwtService } from '@nestjs/jwt';
import { strings } from 'src/strings';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(logInDto: LogInDto) {
    const usersRef = await FIREBASE_STORAGE_DB.collection('users');

    const users = await usersRef
      .where('username', '==', logInDto.username)
      .get();

    if (users.empty) {
      return { message: strings.auth.loginFailed };
    }

    let userData = null;

    users.docs.map(e => {
      userData = { ...e.data() };
      userData.id = e.id;
    });

    console.log(userData);

    // const user = users.docs.map(user => {
    //   const userInfo = user.data();
    //   return { id: user.id, ...userInfo };
    // })[0];

    const matchPassword = await bcrypt.compare(
      logInDto.password,
      userData.password,
    );

    if (!matchPassword) {
      return { message: strings.auth.loginFailed };
    }

    return {
      data: {
        token: this.jwtService.sign({
          username: userData.username,
          id: userData.id,
          role: userData.role,
        }),
      },
    };
  }
}
