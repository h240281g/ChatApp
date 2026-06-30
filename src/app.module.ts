import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, AuthModule, MessageModule, MongooseModule.forRoot('mongodb+srv://elias:Wayne1905@assignmentlab60.tp05cfm.mongodb.net/ChatApp')],
  controllers: [],
  providers: [],
})
export class AppModule {}
