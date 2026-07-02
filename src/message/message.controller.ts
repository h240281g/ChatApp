import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { Types } from 'mongoose';

@Controller('message')
export class MessageController {
  constructor(
    private messageService: MessageService,
    private messageGateway: MessageGateway,
  ) {}

  @Post(':id')
  @UsePipes(new ValidationPipe())
  async createMsg(
    @Param('id') senderID: string,
    @Body() createMsgDto: CreateMessageDto,
  ) {
    const message = await this.messageService.createMsg(senderID, createMsgDto);
    this.messageGateway.sendNewMessage(message);
    return message;
  }
  @Post()
  @UsePipes(new ValidationPipe())
  async getMessages(@Body(ValidationPipe) { senderID, receiverID }) {
    return this.messageService.getMessages(senderID, receiverID);
  }

  @Get('/users')
  async getUsers() {
    return this.messageService.getAllUsers();
  }

@Delete(':id')
@UsePipes(new ValidationPipe())
  async deleteMessage(@Param('id')id:string)
  {
    return  this.messageService.deleteMessage(id)
  }
}
