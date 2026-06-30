import { CreateMessageDto } from './dto/createMessage.dto';
import { Message } from './schema/messageSchema';
import { Model, Types } from 'mongoose';
import { User } from "../users/schema/userSchema";
export declare class MessageService {
    private messageModel;
    private userModel;
    constructor(messageModel: Model<Message>, userModel: Model<User>);
    createMsg(senderID: string, createMsgDto: CreateMessageDto): Promise<import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getUserById(id: string): Promise<string>;
    getMessages(senderID: string, receiverID: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}, import("mongoose").DefaultSchemaOptions> & Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    validateObjectIDSR(senderID: string, receiverID: string): Promise<string>;
}
