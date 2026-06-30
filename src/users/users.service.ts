import {
    ConflictException,
    HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { privateDecrypt } from 'crypto';
import { Model } from 'mongoose';
import { User } from './schema/userSchema';
import { LoginDto } from 'src/auth/dto/login.Dto';
import { CreateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async validateUser({ username, password }: LoginDto) {
    const findUser = await this.userModel.findOne({ username }).select('+password');
    if (!findUser) {
      throw new NotFoundException('User not Found');
    }
    const isMatch = await bcrypt.compare(password, findUser.password);

    if (isMatch) {
      console.log('Login successful');
    } else throw new UnauthorizedException('Invalid password');

    const { password: _, ...result } = findUser.toObject();
    return result;
  }

  async createUser({username,...createUserDto}: CreateUserDto) {
    const findUser = await this.userModel.findOne({username});
    if (!findUser) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
        const newUser = new this.userModel({
            username,
          ...createUserDto,
          password: hashedPassword,
        });
      
         await newUser.save();
         
         const { password: _, ...result } = newUser.toObject();
        return result;
    }
    else throw new ConflictException("Username already exists");
   
  }
}
