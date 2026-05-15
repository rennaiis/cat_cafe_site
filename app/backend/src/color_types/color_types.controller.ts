import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColorTypesService } from './color_types.service';
import { CreateColorTypeDto } from './dto/create-color_type.dto';
import { UpdateColorTypeDto } from './dto/update-color_type.dto';

@Controller('color-types')
export class ColorTypesController {
  constructor(private readonly colorTypesService: ColorTypesService) {}

  @Post()
  create(@Body() createColorTypeDto: CreateColorTypeDto) {
    return this.colorTypesService.create(createColorTypeDto);
  }

  @Get()
  findAll() {
    return this.colorTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColorTypeDto: UpdateColorTypeDto) {
    return this.colorTypesService.update(+id, updateColorTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorTypesService.remove(+id);
  }
}
