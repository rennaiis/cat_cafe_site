import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UsersService } from "../users/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer{
    constructor(private userService: UsersService){
        super()
    }
    serializeUser(user: any, done: Function) {
        done(null, user.user_id)
    }
    async deserializeUser(user_id: number, done: Function) {
        const user = await this.userService.findOne(user_id)
        done(null, user)
  }
}

