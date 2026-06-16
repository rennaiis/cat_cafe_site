import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdoptersService } from './adopters.service';
import { CreateAdopterDto } from './dto/create-adopter.dto';
import { UpdateAdopterDto } from './dto/update-adopter.dto';
import { Public } from '../auth/session-auth.guard';

@Controller('adopters')
export class AdoptersController {
  constructor(private readonly adoptersService: AdoptersService) {}

  @Public()
  @Post()
  create(@Body() createAdopterDto: CreateAdopterDto) {
    return this.adoptersService.create(createAdopterDto);
  }
  
  @Public()
  @Get()
  findAll() {
    return this.adoptersService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adoptersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdopterDto: UpdateAdopterDto) {
    return this.adoptersService.update(+id, updateAdopterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adoptersService.remove(+id);
  }
}
