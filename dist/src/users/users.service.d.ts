import { Model } from 'mongoose';
import { User } from './schema/userSchema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
}
