import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LandingDataService } from './landing-data.service';
import { UpdateLandingDataDto } from './dto/update-landing-data.dto';
import { LandingItemType } from '../../../enums/LandingItemType';
import { Public } from '../auth/session-auth.guard';

@Controller('landing-data')
export class LandingDataController {
  constructor(private readonly landingDataService: LandingDataService) {}
  @Public()
  @Get()
  findAll() {
    return this.landingDataService.findAll();
  }

  @Post()
  async updateAll(@Body() object: Record<string, any>){
    return this.landingDataService.updateAll(object)
  }    
}
