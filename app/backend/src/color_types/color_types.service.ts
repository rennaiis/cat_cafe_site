import { Injectable } from '@nestjs/common';
import { CreateColorTypeDto } from './dto/create-color_type.dto';
import { UpdateColorTypeDto } from './dto/update-color_type.dto';

@Injectable()
export class ColorTypesService {
  create(createColorTypeDto: CreateColorTypeDto) {
    return 'This action adds a new colorType';
  }

  findAll() {
    return `This action returns all colorTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} colorType`;
  }

  update(id: number, updateColorTypeDto: UpdateColorTypeDto) {
    return `This action updates a #${id} colorType`;
  }

  remove(id: number) {
    return `This action removes a #${id} colorType`;
  }
}
