import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdoptApplicationsService } from './adopt_applications.service';
import { CreateAdoptApplicationDto } from './dto/create-adopt_application.dto';
import { UpdateAdoptApplicationDto } from './dto/update-adopt_application.dto';
import { Public } from '../auth/session-auth.guard';

@Controller('adopt-applications')
export class AdoptApplicationsController {
  constructor(private readonly adoptApplicationsService: AdoptApplicationsService) {}

  @Public()
  @Post()
  create(@Body() createAdoptApplicationDto: CreateAdoptApplicationDto) {
    return this.adoptApplicationsService.create(createAdoptApplicationDto);
  }
  @Public()
  @Get()
  findAll() {
    return this.adoptApplicationsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adoptApplicationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdoptApplicationDto: UpdateAdoptApplicationDto) {
    return this.adoptApplicationsService.update(+id, updateAdoptApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adoptApplicationsService.remove(+id);
  }
}
