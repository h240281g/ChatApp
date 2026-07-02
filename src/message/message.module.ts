import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/messageSchema';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/schema/userSchema';
import { MessageGateway } from './message.gateway';

@Module({
  imports:[MongooseModule.forFeature(
      [
        {
          name: Message.name,
          schema: MessageSchema
        },
       { name: User.name,
        schema: UserSchema
      }
      
      ]
    ), UsersModule],
  providers: [MessageService, MessageGateway],
  controllers: [MessageController],
  exports:[MessageService]
})
export class MessageModule {}
