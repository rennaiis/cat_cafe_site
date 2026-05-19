import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdoptApplicationDto } from './dto/create-adopt_application.dto';
import { UpdateAdoptApplicationDto } from './dto/update-adopt_application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdoptApplication } from './entities/adopt_application.entity';
import { CatsService } from '../cats/cats.service';
import { AdoptersService } from '../adopters/adopters.service';
import { Cat } from '../cats/entities/cat.entity';
import { Adopter } from '../adopters/entities/adopter.entity';

@Injectable()
export class AdoptApplicationsService {
  constructor(
    @InjectRepository(AdoptApplication)
    private readonly adoptApplicationsRepository,
    private readonly catService: CatsService,
    private readonly adopterService: AdoptersService

  ){}
  async create(createAdoptApplicationDto: CreateAdoptApplicationDto) {
    const cat = await this.catService.findOne(createAdoptApplicationDto.cat_id)
    const adopter = await this.adopterService.findOne(createAdoptApplicationDto.adopter_id)
    const application = this.adoptApplicationsRepository.create({
      ...createAdoptApplicationDto, 
      adopter: adopter, 
      cat: cat
    })
    return await this.adoptApplicationsRepository.save(application)
  }

  async findAll() {
    return await this.adoptApplicationsRepository.find({
      relations: ['cat', 'adopter']
    })
  }

  async findOne(id: number) {
    const application = await this.adoptApplicationsRepository.findOne({
      where: {id}, 
      relations: ['cat', 'adopter']
    })
    if (!application) throw new NotFoundException()
    return application
  }

  async update(id: number, updateAdoptApplicationDto: UpdateAdoptApplicationDto) {
    let cat: Cat | undefined
    let adopter: Adopter | undefined
    const application = await this.findOne(id)
    if (updateAdoptApplicationDto.adopter_id){
      adopter =  await this.adopterService.findOne(updateAdoptApplicationDto.adopter_id)
      application.adopter = adopter
    }
    if(updateAdoptApplicationDto.cat_id){
      cat = await this.catService.findOne(updateAdoptApplicationDto.cat_id)
      application.cat = cat
    }
    this.adoptApplicationsRepository.merge(application, updateAdoptApplicationDto)
    return await this.adoptApplicationsRepository.save(application)

  }

  async remove(id: number) {
    const application = await this.findOne(id)
    return await this.adoptApplicationsRepository.remove(application)
  }
}
