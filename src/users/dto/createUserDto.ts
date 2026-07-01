import { IsEmail, IsNotEmpty, IsString } from "class-validator"


export class CreateUserDto{

@IsString()
@IsNotEmpty()
username: string

@IsString()
@IsNotEmpty()
fullname: string

@IsString()
@IsNotEmpty()
password: string

@IsString()
@IsEmail()
@IsNotEmpty()
email: string


}