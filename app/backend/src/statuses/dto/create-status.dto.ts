import { IsEnum, IsHexColor, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { StatusType } from "../../../../enums/StatusType";

export class CreateStatusDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  status: string;

  @IsString()
  @IsNotEmpty()
  @IsHexColor({ message: 'must be HEX color code' })
  @MaxLength(8)
  color: string;

  @IsEnum(StatusType, { message: 'must be: in_cafe, hidden, adopted' })
  @IsNotEmpty()
  type: StatusType;
}
