import { Injectable } from '@nestjs/common';
import { CreatePhotosApplicationDto } from './dto/create-photos_application.dto';
import { UpdatePhotosApplicationDto } from './dto/update-photos_application.dto';

@Injectable()
export class PhotosApplicationsService {
  create(createPhotosApplicationDto: CreatePhotosApplicationDto) {
    return 'This action adds a new photosApplication';
  }

  findAll() {
    return `This action returns all photosApplications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photosApplication`;
  }

  update(id: number, updatePhotosApplicationDto: UpdatePhotosApplicationDto) {
    return `This action updates a #${id} photosApplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} photosApplication`;
  }
}
