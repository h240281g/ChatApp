import { Model } from 'mongoose';
import { User } from "../users/schema/userSchema";
import { LoginDto } from './dto/login.Dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    validateUser({ username, password }: LoginDto): Promise<{
        access_token: string;
        user: {
            username: string;
            fullname: string;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
}
