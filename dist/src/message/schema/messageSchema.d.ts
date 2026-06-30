import { Types } from 'mongoose';
export declare class Message {
    messageBody: string;
    senderID: Types.ObjectId;
    receiverID: Types.ObjectId;
}
export declare const MessageSchema: import("mongoose").Schema<Message, import("mongoose").Model<Message, any, any, any, any, any, Message>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, import("mongoose").Document<unknown, {}, Message, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Message & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    messageBody?: import("mongoose").SchemaDefinitionProperty<string, Message, import("mongoose").Document<unknown, {}, Message, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    senderID?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Message, import("mongoose").Document<unknown, {}, Message, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    receiverID?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Message, import("mongoose").Document<unknown, {}, Message, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Message>;
