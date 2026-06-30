import { Model } from 'mongoose';
import { User } from './schema/userSchema';
import { CreateUserDto } from './dto/createUserDto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    createUser({ username, ...createUserDto }: CreateUserDto): Promise<{
        username: string;
        fullname: string;
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getUser(username: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, User, "findOne", {}>;
    getUserById(id: string): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
