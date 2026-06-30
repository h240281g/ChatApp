import { Model } from 'mongoose';
import { User } from "../users/schema/userSchema";
import { LoginDto } from './dto/login.Dto';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<User>);
    validateUser({ username, password }: LoginDto): Promise<{
        username: string;
        fullname: string;
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
}
