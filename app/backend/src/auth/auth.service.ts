import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService
    ){}

    async validateUser(login: string, password: string): Promise<User | null> {
        const user = await this.userService.findByLogin(login)
        if (!user){
            return null
        }
        const isValid = verify(user.password_hash, password)
        if (!isValid){
            return null
        }
        return user
    }
}
