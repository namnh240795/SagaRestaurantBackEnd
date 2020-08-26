import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { LogInDto } from './dtos/log-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() logInDto: LogInDto) {
    return this.authService.login(logInDto);
  }
}