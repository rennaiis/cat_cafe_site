import { IsString, IsNotEmpty, MaxLength, IsOptional, IsDate, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  last_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  middle_name?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  phone_number: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  contact?: string;

  @Transform(({ value }) => new Date(value)) 
  @IsDate()
  @IsNotEmpty()
  birth_date: Date;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  salary: number;
}
