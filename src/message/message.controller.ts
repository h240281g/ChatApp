import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageService } from './message.service';
import { Types } from 'mongoose';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Post(':id')
  @UsePipes(new ValidationPipe())
  async createMsg(
    @Param('id') senderID: string,
    @Body() createMsgDto: CreateMessageDto,
  ) {
    this.messageService.validateObjectIDSR(senderID, createMsgDto.receiverID);
    return this.messageService.createMsg(senderID, createMsgDto);
  }
  @Get()
  @UsePipes(new ValidationPipe())
  async getMessages(@Body() { senderID, receiverID }) {
    this.messageService.validateObjectIDSR(senderID, receiverID);
    return this.messageService.getMessages(senderID, receiverID);
  }
}
