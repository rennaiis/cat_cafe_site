import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    question_text: string;

    @Transform(({value})=> value === 'true' || value === true)
    @IsBoolean()
    is_mandatory: boolean;

    @Transform(({value})=> value === 'true' || value === true)
    @IsBoolean()
    is_open: boolean;

    @Transform(({ value }) => value === 'true' || value === true)
    @IsBoolean()
    one_answer: boolean;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    variants?: string[]


}
