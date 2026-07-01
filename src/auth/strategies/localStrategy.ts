import {Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy} from 'passport-local';
import { AuthService } from "../auth.service";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }

    async validate(username:string, password:string){
        console.log('Second Strategy')
        const user = await this.authService.validateUser({username,password});
        if (!user) throw new UnauthorizedException();
        return user;
    }
}

//LocalStrategy uses passport-local 
//it just validate the user with the username and password