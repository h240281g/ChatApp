import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;
export type MessageDocument = Message & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true, index: true })
  username: string; 
  
  @Prop({ required: true, select: false })
  password: string; 

  @Prop({ required: true, trim: true })
  fullName: string; 
}

export const UserSchema = SchemaFactory.createForClass(User);

@Schema({ timestamps: true })
export class Message {
  @Prop({ maxlength: 250, required: true, trim: true })
  messageBody: string; 
  
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  sender: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  receiver: Types.ObjectId; 
}

export const MessageSchema = SchemaFactory.createForClass(Message);

// Compound index for fast 1:1 chat queries
MessageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });

//dtos

export class CreateUserDto {
  username: string; 
  password: string;
  fullName: string 
}

export class LoginDto { 
  username: string; 
  password: string 
}

export class CreateMessageDto { 
  receiverId: string;
  messageBody: string
}