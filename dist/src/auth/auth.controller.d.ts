import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.Dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    validateUser(loginDto: LoginDto): Promise<{
        username: string;
        fullname: string;
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
}
