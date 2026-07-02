import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schema/userSchema';
import { LoginDto } from 'src/auth/dto/login.Dto';
import { CreateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser({ username, email, ...createUserDto }: CreateUserDto) {
    const findUserEmail = await this.userModel.findOne({ email });

    if (findUserEmail) {
      throw new ConflictException('Email already exists');
    }

    const findUser = await this.userModel.findOne({ username });
    if (!findUser) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = new this.userModel({
        username,
        email,
        ...createUserDto,
        password: hashedPassword,
      });

      await newUser.save();

      const { password: _, ...result } = newUser.toObject();
      return result;
    } else throw new ConflictException('Username already exists');
  }

  getUser(username: string) {
    return this.userModel.findOne({ username });
  }

  async getUserById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(
        'Incorrect Format:  Verify User or Receiver ObjectIDs',
      );
    }
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(
        'User Not Found:  Verify User or Receiver ObjectIDs',
      );
    }

    return `correct & exists: true`;
  }

  async deleteUser(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Incorrect ID Format:  Verify user ObjectID');
    }
    const message = await this.userModel.findById(id);

    if (!message) {
      throw new NotFoundException('UserNot Found:  Verify userObjectID');
    }
    return await this.userModel.findByIdAndDelete(id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.getUserById(id);

    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      const updatedUser = await this.userModel.findByIdAndUpdate(id, {
        ...updateUserDto,
        password: hashedPassword,
      });
      return updatedUser;
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, {
      ...updateUserDto,
    });
    return updatedUser;
  }
}
