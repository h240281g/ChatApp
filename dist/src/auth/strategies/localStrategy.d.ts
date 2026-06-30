import { AuthService } from "../auth.service";
declare const LocalStrategy_base: new (...args: any) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<{
        access_token: string;
        user: {
            username: string;
            fullname: string;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
}
export {};
