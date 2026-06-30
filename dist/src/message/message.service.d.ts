import { CreateMessageDto } from './dto/createMessage.dto';
import { Message } from './schema/messageSchema';
import { Model, Types } from 'mongoose';
import { User } from "../users/schema/userSchema";
export declare class MessageService {
    private messageModel;
    private userModel;
    constructor(messageModel: Model<Message>, userModel: Model<User>);
    createMsg(SenderID: string, createMsgDto: CreateMessageDto): Promise<import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getUserById(id: string): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getMessages(senderID: string, receiverID: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    validateObjectIDSR(senderID: string, receiverID: string): Promise<void>;
}
