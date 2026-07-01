import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  async createMsg(senderID: string, createMsgDto: CreateMessageDto) {
    await this.validateObjectIDSR(senderID, createMsgDto.receiverID);

    const newMsg = new this.messageModel({
      senderID,
      ...createMsgDto,
    });

    return await newMsg.save();
  }
  async getUserById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('Incorrect Format:  Verify User or Receiver ObjectIDs');

    }
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User Not Found:  Verify User or Receiver ObjectIDs');
    }

    return  `correct & exists: true`
  }

  async getMessages(senderID: string, receiverID: string) {
    await this.validateObjectIDSR(senderID, receiverID);
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
  
      const sender = await this.getUserById(senderID);
      if (!sender) {
        throw new NotFoundException('Sender not found');
      }
      const receiver = await this.getUserById(receiverID);
      if (!receiver) {
        throw new NotFoundException('Receiver not found');
      }
            
      return `All Validations Done on Sender and Receiver`

  }

  async getAllUsers() {
    
    const users = await this.userModel.find().select('username')
    return  users
  }
}
