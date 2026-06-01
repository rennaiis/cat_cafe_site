import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLandingDataDto } from './dto/create-landing-data.dto';
import { UpdateLandingDataDto } from './dto/update-landing-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LandingData } from './entities/landing-data.entity';
import { Repository } from 'typeorm';
import { LandingItemType } from '../../../enums/LandingItemType';
import { makeInitialLandingData } from '../seed';

@Injectable()

export class LandingDataService {
  constructor(
    @InjectRepository(LandingData)
    private readonly landingDataRepository: Repository<LandingData>
  ){}
  async create(createLandingDataDto: CreateLandingDataDto) {
     const item = await this.landingDataRepository.create(createLandingDataDto)
     return await this.landingDataRepository.save(item)
  }

  async findAll() {
    await makeInitialLandingData(this)
    const items = await this.landingDataRepository.find()
    return items.reduce((acc, item)=>{
      acc[item.type] = item.text
      return acc
    }, {})
  }

  async findOne(type: LandingItemType) {
     const item = await this.landingDataRepository.findOne({
      where: {type: type}
     })
     if (!item) throw new NotFoundException
     return await item
  }

  async findOneNoExeption(type: LandingItemType) {
     const item = await this.landingDataRepository.findOne({
      where: {type: type}
     })
     if (!item){
      return null
     }else{
      return await item
     } 
  }
  

  async update(type: LandingItemType, updateLandingDataDto: UpdateLandingDataDto) {
    await this.landingDataRepository.upsert(
      {type, ...updateLandingDataDto}, 
      ['type']
    )
    return this.findOne(type)
  }
}
