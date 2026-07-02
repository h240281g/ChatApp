import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  NotFoundException,
  Delete,
  Patch,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { LoginDto } from 'src/auth/dto/login.Dto';
import { CreateUserDto } from './dto/createUserDto';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

    @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() { username, ...createUserDto }: CreateUserDto) {
    return this.userService.createUser({ username, ...createUserDto });
  }
  @Get('username/:username') //DISTINCT ROUTES
  @UsePipes(new ValidationPipe())
  getUser(@Param('username') username: string) {
    const user = this.userService.getUser(username);
    return user;
  }
 
  @Get(':id')
  @UsePipes(new ValidationPipe)
  async getUserById(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
    async deleteMessage(@Param('id')id:string)
    {
      return  this.userService.deleteUser(id)
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id')id:string,@Body()updateUserDto:UpdateUserDto)
    {
      return  await this.userService.updateUser(id,updateUserDto);
    }

}
