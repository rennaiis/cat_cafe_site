import { Module } from '@nestjs/common';
import { PhotosApplicationsService } from './photos_applications.service';
import { PhotosApplicationsController } from './photos_applications.controller';

@Module({
  controllers: [PhotosApplicationsController],
  providers: [PhotosApplicationsService],
})
export class PhotosApplicationsModule {}
