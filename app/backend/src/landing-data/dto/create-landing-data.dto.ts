import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsPhoneNumber, IsString, IsUrl, Matches, ValidateIf } from "class-validator";
import { LandingItemType } from "../../../../enums/LandingItemType";
import { iterator } from "rxjs/internal/symbol/iterator";

export class CreateLandingDataDto {
    @IsEnum(LandingItemType)
    @IsNotEmpty()
    type: LandingItemType

    @IsString()
    @IsNotEmpty()
    @ValidateIf(item => item.type === LandingItemType.CONTACT_EMAIL)
    @IsEmail({}, {message: 'wrong e-mail format'})

    @ValidateIf(o => o.type === LandingItemType.CONTACT_PHONE)
    @IsPhoneNumber('RU', { message: 'wrong phone number' })

    @ValidateIf(o => o.type === LandingItemType.VK_LINK || o.type === LandingItemType.MAP_LINK)
    @IsUrl({}, { message: 'link does not work'})

    @ValidateIf(o => o.type === LandingItemType.OPEN_TIME || o.type === LandingItemType.CLOSE_TIME)
    @IsNumberString({}, { message: 'must be number' }) 
    @Matches(/^(?:[0-9]|1[0-9]|2[0-4])$/, { message: 'must be between 0 and 24h' }) 

    @ValidateIf(o => o.type === LandingItemType.CATS_AT_HOME || o.type === LandingItemType.CATS_IN_CAFE || o.type === LandingItemType.STUDENTS_PRICE || o.type === LandingItemType.FIRST_HOUR_PRICE_STANDART || o.type === LandingItemType.FIRST_HOUR_PRICE_STANDART || o.type === LandingItemType.GROUP_PEOPLE_AMOUNT || o.type === LandingItemType.GROUP_DISCOUNT)
    @IsNumberString({}, {message: 'must be number'})
    text: string;
}
