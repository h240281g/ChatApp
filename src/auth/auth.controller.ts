import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.Dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalGuard)// Invoking our localStrategy
  validateUser(@Body() loginDto: LoginDto) {
    const user= this.authService.validateUser(loginDto);
    return user;
  }

  //Authenticated request
  @Get('status')
  @UseGuards(AuthGuard('local'))
  status(@Req()req: Request){
    console.log('InsideController')
    return  req.user
  }
}
