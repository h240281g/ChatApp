import { UsersService } from './users.service';
import { LoginDto } from "../auth/dto/login.Dto";
import { CreateUserDto } from './dto/createUserDto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    validateUser(loginDto: LoginDto): Promise<{
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
