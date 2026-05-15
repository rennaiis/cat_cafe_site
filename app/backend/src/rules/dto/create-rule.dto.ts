import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}