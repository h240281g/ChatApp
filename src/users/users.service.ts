import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { privateDecrypt } from 'crypto';
import { Model } from 'mongoose';
import { User } from './schema/userSchema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name)private userModel: Model<User>){}
    
}
