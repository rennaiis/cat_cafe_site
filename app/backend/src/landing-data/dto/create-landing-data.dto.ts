import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsUrl, Matches, ValidateIf } from "class-validator";
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
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'wrong time format' })
    text: string
}
