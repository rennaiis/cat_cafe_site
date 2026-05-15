import { PartialType } from '@nestjs/swagger';
import { CreateAdoptApplicationDto } from './create-adopt_application.dto';

export class UpdateAdoptApplicationDto extends PartialType(CreateAdoptApplicationDto) {}
