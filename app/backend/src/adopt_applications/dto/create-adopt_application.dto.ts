import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { ApplicationStatus } from "../../../../enums/ApplicationStatus";

export class CreateAdoptApplicationDto {
  @IsNotEmpty()
  @IsInt()
  adopter_id: number;

  @IsNotEmpty()
  @IsInt()
  cat_id: number;

  @IsNotEmpty()
  @IsEnum(ApplicationStatus)
  application_status: ApplicationStatus;

}
