import { PartialType } from '@nestjs/swagger';
import { CreateColorTypeDto } from './create-color_type.dto';

export class UpdateColorTypeDto extends PartialType(CreateColorTypeDto) {}
