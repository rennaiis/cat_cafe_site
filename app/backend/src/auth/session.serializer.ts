import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UsersService } from "../users/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer{
    constructor(private userService: UsersService){
        super()
    }
    serializeUser(user: any, done: Function) {
        done(null, user.id)
    }
    async deserializeUser(id: number, done: Function) {
        const user = await this.userService.findOne(id)
        done(null, user)
  }
}

