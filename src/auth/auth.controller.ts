import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Controller('auth')
export class AuthController {}
