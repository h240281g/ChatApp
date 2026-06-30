import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto';
import { Types } from 'mongoose';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUser({ username, ...createUserDto }: CreateUserDto): Promise<{
        username: string;
        fullname: string;
        _id: Types.ObjectId;
        __v: number;
    }>;
    getUser(username: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./schema/userSchema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/userSchema").User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, import("mongoose").Document<unknown, {}, import("./schema/userSchema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/userSchema").User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("./schema/userSchema").User, "findOne", {}>;
    geAlltUsers(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/userSchema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/userSchema").User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getUserById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/userSchema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/userSchema").User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
