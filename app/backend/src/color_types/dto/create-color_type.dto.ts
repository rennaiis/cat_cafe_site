import { Transform } from "class-transformer";
import { IsHexColor, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateColorTypeDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    color_type: string

    @IsString()
    @IsHexColor()
    @IsNotEmpty()
    @MaxLength(8)
    color: string

    @Transform(({value})=>parseInt(value))
    @IsInt()
    @IsNotEmpty()
    file_id: number    
}
