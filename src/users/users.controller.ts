import { UpdateUserPasswordDto } from './dtos/update-user.dto';
import { User } from './interfaces/user.inteface';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { RemoveUserDto } from './dtos/remove-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Put()
  async update(@Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    this.usersService.updatePassword(updateUserPasswordDto);
  }

  @Delete(':username')
  async remove(@Param() removeUserDto: RemoveUserDto) {
    this.usersService.remove(removeUserDto);
  }

  @Get('/search')
  async search(): Promise<User[]> {
    return this.usersService.search();
  }
}
