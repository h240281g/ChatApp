import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageService } from './message.service';
import { Types } from 'mongoose';
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    createMsg(senderID: string, createMsgDto: CreateMessageDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/messageSchema").Message, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/messageSchema").Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getMessages({ senderID, receiverID }: {
        senderID: any;
        receiverID: any;
    }): Promise<(import("mongoose").Document<unknown, {}, import("./schema/messageSchema").Message, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/messageSchema").Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
