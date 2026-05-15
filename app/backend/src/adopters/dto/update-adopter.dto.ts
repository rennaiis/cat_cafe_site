import { PartialType } from '@nestjs/swagger';
import { CreateAdopterDto } from './create-adopter.dto';

export class UpdateAdopterDto extends PartialType(CreateAdopterDto) {}
