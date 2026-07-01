import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{

@Prop({unique: true, required: true})
username: string

@Prop({required: true})
fullname: string

@Prop({required: true,select:false})
password: string

@Prop ({required:true})
email:string

}

export const UserSchema = SchemaFactory.createForClass(User)