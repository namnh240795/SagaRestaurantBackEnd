import { AuthService } from './auth.service';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { LogInDto } from './dtos/log-in.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() logInDto: LogInDto, @Res() res) {
    const result = await this.authService.login(logInDto);

    return res.send(result);
  }
}
