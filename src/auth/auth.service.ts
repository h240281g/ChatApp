import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/userSchema';
import { LoginDto } from './dto/login.Dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: LoginDto) {
    const findUser = await this.userModel.findOne({ username }).select('+password');
    if (!findUser) {
      return null;
    }

    const isMatch = password === findUser.password;
    if (isMatch) {
      console.log('Login successful');
    } else {
      return null;
    }

    const { password: _, ...result } = findUser.toObject();// destructuring we exclude password 

    const payload = { 
      sub: result._id,// this is user id
      username: result.username 
    };

    return {
      accessJwtToken: this.jwtService.sign(payload, { expiresIn: '1h' }),// generating Jwt token with the sign method
      user: result 
    };
  }
}
