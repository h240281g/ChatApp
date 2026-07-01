import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt'
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/userSchema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/localStrategy';
import { JwtStrategy } from './strategies/jwtStrategy';

@Module({
  imports:[PassportModule,JwtModule.register({
    secret: 'abcd123',
    signOptions: { expiresIn: '1h' }
  }),UsersModule,MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema
        }
      ]
    )],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService,AuthModule]
})
export class AuthModule {}
