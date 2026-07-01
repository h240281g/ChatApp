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
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalGuard)// Invoking our localStrategy
  validateUser(@Req()req: Request) {
    return req.user
  }

  //Authenticated request
  @Get('status')
  @UseGuards(JwtGuard)
  status(@Req()req: Request){
    console.log('InsideController')
    console.log(req.user);
    return req.user
  }
}
