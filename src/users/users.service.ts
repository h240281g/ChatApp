import {
    ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/userSchema';
import { LoginDto } from 'src/auth/dto/login.Dto';
import { CreateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  
  async createUser({username,...createUserDto}: CreateUserDto) 
  {
    const findUser = await this.userModel.findOne({username});
    if (!findUser) {
       // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
       const hashedPassword=createUserDto.password
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
  async getAllUsers() {
    return await this.userModel.find();
  }

  getUser(username: string) {
    return this.userModel.findOne({ username });
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }
}
