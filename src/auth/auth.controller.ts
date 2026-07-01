import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.Dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

    @Post('login')
      @UsePipes(new ValidationPipe)
      @UseGuards(AuthGuard('local'))
      validateUser(@Body() loginDto: LoginDto) {
        return this.authService.validateUser(loginDto);
      }
}
