import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { User } from "src/users/schema/userSchema";

@Schema({timestamps: true})
export class Message{

    @Prop({required: true, maxLength: 250})
    messageBody: string

    @Prop({required:true,type: Types.ObjectId, ref: User.name })
    senderID: Types.ObjectId
    
    @Prop({required:true,type: Types.ObjectId, ref: User.name })
    receiverID: Types.ObjectId
}
export const MessageSchema = SchemaFactory.createForClass(Message)
MessageSchema.index({senderID:1,receiverID:1,createdAt:-1})