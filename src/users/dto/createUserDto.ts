import { IsNotEmpty, IsString } from "class-validator"


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

}