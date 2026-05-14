import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LandingDataService } from './landing-data.service';
import { UpdateLandingDataDto } from './dto/update-landing-data.dto';
import { LandingItemType } from '../../../enums/LandingItemType';

@Controller('landing-data')
export class LandingDataController {
  constructor(private readonly landingDataService: LandingDataService) {}

  @Get()
  findAll() {
    return this.landingDataService.findAll();
  }

  @Patch(':type')
    update(
      @Param('type') type: LandingItemType, 
      @Body() updateLandingDataDto: UpdateLandingDataDto
    ) {
      return this.landingDataService.update(type, updateLandingDataDto);
    }
}
