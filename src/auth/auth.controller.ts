import {
  Body,
  Controller,
  Get,
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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('my-local'))// Invoking our localStrategy
  validateUser(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto);
  }

  //Authenticated request
  @Get('status')
  @UseGuards(AuthGuard('local'))
  status(@Req()req: Request){
    console.log('InsideController')
    return  req.user
  }
}
