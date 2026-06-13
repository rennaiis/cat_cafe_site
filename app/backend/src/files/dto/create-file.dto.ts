import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileType } from "../../../../enums/FileType";
import { FileCategory } from "../../../../enums/FileCategory";
import { Transform } from "class-transformer";

export class CreateFileDto {
    @IsEnum(FileType)
    type: FileType

    @IsEnum(FileCategory)
    category: FileCategory

    @IsOptional()
    @Transform(({value})=>parseInt(value, 10))
    @IsInt()
    cat_id?: number

    @IsOptional()
    @Transform(({value})=>parseInt(value, 10))
    @IsInt()
    color_type_id?: number

    @Transform(({value})=> value === 'true' || value === true)
    @IsBoolean()
    @IsOptional()
    is_approved: boolean
}
