import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/userSchema';
import { LoginDto } from './dto/login.Dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
     constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    
      async validateUser({ username, password }: LoginDto) {
        const findUser = await this.userModel.findOne({ username }).select('+password');
        if (!findUser) {
          throw new NotFoundException('User not Found');
        }
      //  const isMatch = await bcrypt.compare(password, findUser.password);
      const isMatch = password===findUser.password
        if (isMatch) {
          console.log('Login successful');
        } else throw new UnauthorizedException('Invalid password');
    
        const { password: _, ...result } = findUser.toObject();
        return result;
      }
}
