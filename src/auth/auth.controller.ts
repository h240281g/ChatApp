import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.Dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

    @Post()
      @UsePipes(new ValidationPipe)
      validateUser(@Body() loginDto: LoginDto) {
        return this.authService.validateUser(loginDto);
      }
}
