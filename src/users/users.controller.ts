import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from 'src/auth/dto/login.Dto';
import { CreateUserDto } from './dto/createUserDto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/auth')
  @UsePipes(new ValidationPipe())
  validateUser(@Body() loginDto: LoginDto) {
    return this.userService.validateUser(loginDto);
  }
    
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(){username,...createUserDto}: CreateUserDto) {
    return this.userService.createUser({username,...createUserDto})
  }
}
