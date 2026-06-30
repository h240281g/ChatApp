import { Model } from 'mongoose';
import { User } from './schema/userSchema';
import { LoginDto } from "../auth/dto/login.Dto";
import { CreateUserDto } from './dto/createUserDto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    validateUser({ username, password }: LoginDto): Promise<{
        username: string;
        fullname: string;
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
    createUser({ username, ...createUserDto }: CreateUserDto): Promise<{
        username: string;
        fullname: string;
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
}
