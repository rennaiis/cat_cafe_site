import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColorTypeDto } from './dto/create-color_type.dto';
import { UpdateColorTypeDto } from './dto/update-color_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorType } from './entities/color_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorTypesService {
  constructor(
    @InjectRepository(ColorType)
    private readonly colorTypeRepository: Repository<ColorType>
  ){}
  async create(createColorTypeDto: CreateColorTypeDto) {
    const newColorType = this.colorTypeRepository.create(createColorTypeDto)
    return await this.colorTypeRepository.save(newColorType)
  }

  async findAll() {
    return await this.colorTypeRepository.find({
      relations: ['files']
    }
    )
  }

  async findOne(id: number) {
    const type = await this.colorTypeRepository.findOne({
      where: {id}, 
      relations: ['files']
    })
    if (!type){
      throw new NotFoundException("no type with this id")
    }
    return type
  }

  async update(id: number, updateColorTypeDto: UpdateColorTypeDto) {
    const type = await this.findOne(id);
    const updatedType = this.colorTypeRepository.merge(type, updateColorTypeDto);
    return await this.colorTypeRepository.save(updatedType);
  }

  async remove(id: number) {
    const type = await this.findOne(id);
    await this.colorTypeRepository.remove(type)
  }
}
