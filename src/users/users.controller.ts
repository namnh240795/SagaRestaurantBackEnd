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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.usersService.remove(id);
  }

  @Get('/search')
  async search(): Promise<User[]> {
    return this.usersService.search();
  }
}
