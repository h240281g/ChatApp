import { IsNotEmpty, IsString, maxLength, minLength } from "class-validator"

export class CreateMessageDto{
    @IsString()
    @IsNotEmpty()
    messageBody: string

    @IsString()
    @IsNotEmpty()
    receiverId: string
}