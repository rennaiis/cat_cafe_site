import { PartialType } from '@nestjs/swagger';
import { CreateLandingDataDto } from './create-landing-data.dto';

export class UpdateLandingDataDto extends PartialType(CreateLandingDataDto) {}
