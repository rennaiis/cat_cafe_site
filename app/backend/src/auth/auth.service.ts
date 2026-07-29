import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { verifyPassword } from '../hashVerify';

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
        const isValid = await verifyPassword(user.password_hash, password)
        if (!isValid){
            return null
        }
        return user
    }
}
