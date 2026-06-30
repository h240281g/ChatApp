import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schema/messageSchema';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/schema/userSchema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async createMsg(SenderID: string, createMsgDto: CreateMessageDto) {
    const newMsg = new this.messageModel({
      senderID: SenderID,
      ...createMsgDto,
    });
    await newMsg.save();
    return newMsg;
  }
  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async getMessages(senderID: string, receiverID: string) {
    return await this.messageModel
      .find({
        $or: [
          { senderID, receiverID },
          { receiverID, senderID },
        ],
      })
      .select('messageBody createdAt -_id')
      .sort({ createdAt: 1 });
  }
  async validateObjectIDSR(senderID: string, receiverID: string) {
    if (!Types.ObjectId.isValid(senderID)) {
      throw new NotFoundException('Invalid sender ObjectID');
    }

    const sender = await this.getUserById(senderID);
    const receiver = await this.getUserById(receiverID);

    if (!sender) {
      throw new NotFoundException('Sender not found');
    }
    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }
  }
  

}
