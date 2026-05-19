import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { CatGender } from "../../../../enums/CatGender";

export class CreateCatDto {
    @IsNotEmpty()
    @IsInt()
    status_id: number;

    @IsNotEmpty()
    @IsInt()
    color_type_id: number;

    @IsOptional()
    @IsInt()
    adopter_id?: number;


    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @IsNotEmpty()
    @IsEnum(CatGender)
    gender: CatGender;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    breed?: string;

    @IsOptional()
    @IsDateString()
    birth_date?: string;

    @IsOptional()
    @IsDateString()
    accept_date?: string;

    @IsOptional()
    @IsDateString()
    adopt_date?: string;
}

