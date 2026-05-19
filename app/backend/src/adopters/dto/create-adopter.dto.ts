import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class CreateAdopterDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    first_name: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    last_name: string

    @IsString()
    @IsOptional()
    @MaxLength(100)
    middle_name?: string

    @IsPhoneNumber(undefined)
    @IsOptional()
    mobile?: string

    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    @MaxLength(500)
    contact?: string
    
}
