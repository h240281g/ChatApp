import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt'
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/userSchema';

@Module({
  imports:[JwtModule.register({
    secret: '',
    signOptions: { expiresIn: '1h' }
  }),UsersModule,MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema
        }
      ]
    )],
  providers: [AuthService],
  controllers: [AuthController],
  exports:[AuthService,AuthModule]
})
export class AuthModule {}
