import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, AuthModule, MessageModule, MongooseModule.forRoot(process.env.mongouri)],
  controllers: [],
  providers: [],
})
export class AppModule {}
