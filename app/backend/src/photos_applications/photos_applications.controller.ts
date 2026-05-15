import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhotosApplicationsService } from './photos_applications.service';
import { CreatePhotosApplicationDto } from './dto/create-photos_application.dto';
import { UpdatePhotosApplicationDto } from './dto/update-photos_application.dto';

@Controller('photos-applications')
export class PhotosApplicationsController {
  constructor(private readonly photosApplicationsService: PhotosApplicationsService) {}

  @Post()
  create(@Body() createPhotosApplicationDto: CreatePhotosApplicationDto) {
    return this.photosApplicationsService.create(createPhotosApplicationDto);
  }

  @Get()
  findAll() {
    return this.photosApplicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosApplicationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotosApplicationDto: UpdatePhotosApplicationDto) {
    return this.photosApplicationsService.update(+id, updatePhotosApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosApplicationsService.remove(+id);
  }
}
