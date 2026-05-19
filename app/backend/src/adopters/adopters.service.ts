import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdopterDto } from './dto/create-adopter.dto';
import { UpdateAdopterDto } from './dto/update-adopter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Adopter } from './entities/adopter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdoptersService {
  constructor(
    @InjectRepository(Adopter)
    private readonly adopterRepository: Repository<Adopter>
  ){}
  async create(createAdopterDto: CreateAdopterDto) {
    const newAdopter = this.adopterRepository.create(createAdopterDto)
    return await this.adopterRepository.save(newAdopter)
  }

  async findAll() {
    return await this.adopterRepository.find(
      {
        relations: ['cats', 'adopt_applications']
      }
    )
  }

  async findOne(id: number) {
    const adopter = await this.adopterRepository.findOne({
      where: {id},
      relations: ['cats', 'adopt_applications']
    })
    if (!adopter){
      throw new NotFoundException('no adopter with this id')
    }
    return adopter
  }

  async update(id: number, updateAdopterDto: UpdateAdopterDto) {
    const adopter = await this.findOne(id)
    const updatedAdopter = this.adopterRepository.merge(adopter, updateAdopterDto)
    return await this.adopterRepository.save(updatedAdopter)
  }

  async remove(id: number) {
    const adopter = await this.findOne(id)
    await this.adopterRepository.remove(adopter)
  }
}
