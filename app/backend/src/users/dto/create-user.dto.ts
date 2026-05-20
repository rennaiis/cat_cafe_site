import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { parse } from "path";
import { UserRole } from "../../../../enums/UserRole";

export class CreateUserDto {
    @IsOptional()
    @Transform(({value})=> parseInt(value))
    @IsInt()
    employee_id?: number

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    login: string

    @IsEnum(UserRole)
    role: UserRole

    @IsString()
    @MinLength(8)
    password_hash: string
}
