import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Message{

    @Prop({required: true, maxLength: 250})
    messageBody: string

    @Prop({required: true})
    senderID: string
    
    @Prop({required: true})
    receiverID: string
}
export const MessageSchema = SchemaFactory.createForClass(Message)
MessageSchema.index({senderID:1,receiverID:1,createdAt:-1})