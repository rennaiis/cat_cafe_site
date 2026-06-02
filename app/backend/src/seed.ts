import { LandingItemType } from "../../enums/LandingItemType";
import { UserRole } from "../../enums/UserRole";
import { LandingDataService } from "./landing-data/landing-data.service";
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

export async function makeInitialLandingData(landingDataService: LandingDataService) {
    const allTypes: string[] = Object.keys(LandingItemType)
    for (const type of allTypes){
        const typeValue = LandingItemType[type as keyof typeof LandingItemType]
        
        const exists = await landingDataService.findOneNoExeption(typeValue)
        if (exists === null){
            if (type == 'CATS_AT_HOME' || 
                type == 'CATS_IN_CAFE' ||
                type == 'CLOSE_TIME' || 
                type == 'OPEN_TIME' ||
                type == 'FIRST_HOUR_PRICE_STANDART' ||
                type == 'FOLLOWING_HOURS_PRICE_STANDART' ||
                type == 'GROUP_DISCOUNT' || 
                type == 'GROUP_PEOPLE_AMOUNT' ||
                type == 'STUDENTS_PRICE'){
                    await landingDataService.create({
                        type: LandingItemType[type],
                        text: '0'
                    })
                }else{
                    await landingDataService.create({
                    type: LandingItemType[type], 
                    text: ' -- '
                })
            }
        }
    }
}