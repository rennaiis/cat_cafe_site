import { UserRole } from "../../enums/UserRole";
import { UsersService } from "./users/users.service";

export async function makeInitialUsers(usersService: UsersService) {
    const existing = await usersService.findByLogin('main_admin')
    if (!existing){
        await usersService.create({
            login: 'main_admin', 
            password_hash: 'mewmew123', 
            role: UserRole.ADMIN,
        })
    }else{
        return
    }
    const existing1 = await usersService.findByLogin('content_manager')
    if (!existing1){
        await usersService.create({
            login: 'content_manager', 
            password_hash: 'mewmew123content', 
            role: UserRole.CONTENT_MANAGER,
        })
    }else{
        return
    }
    
}