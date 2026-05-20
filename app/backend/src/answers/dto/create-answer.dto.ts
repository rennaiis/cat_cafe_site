import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsInt()
  @IsNotEmpty()
  question_id: number;

  @IsInt()
  @IsNotEmpty()
  application_id: number;
  
}