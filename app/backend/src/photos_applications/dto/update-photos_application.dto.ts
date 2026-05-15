import { PartialType } from '@nestjs/swagger';
import { CreatePhotosApplicationDto } from './create-photos_application.dto';

export class UpdatePhotosApplicationDto extends PartialType(CreatePhotosApplicationDto) {}
