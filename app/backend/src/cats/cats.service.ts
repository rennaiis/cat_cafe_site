import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { EntityManager, Repository } from 'typeorm';
import { Adopter } from '../adopters/entities/adopter.entity';
import { Status } from '../statuses/entities/status.entity';
import { ColorType } from '../color_types/entities/color_type.entity';
import { StatusesService } from '../statuses/statuses.service';
import { ColorTypesService } from '../color_types/color_types.service';
import { AdoptersService } from '../adopters/adopters.service';
import { DataSource } from 'typeorm';
import { FilesService } from '../files/files.service';
import * as fs from 'fs/promises'
import { CreateFileDto } from '../files/dto/create-file.dto';
import { FileCategory } from '../../../enums/FileCategory';
import { FileType } from '../../../enums/FileType';
import { FileEntity } from '../files/entities/file.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    private readonly adopterService: AdoptersService, 
    private readonly statusService: StatusesService,
    private readonly colorTypeService: ColorTypesService,
    private readonly filesService: FilesService,
    private readonly dataSource: DataSource,
  ){}
  
  async createFullCat(
    createCatDto: CreateCatDto,
    files: Express.Multer.File[]
    ){
      let colorType: ColorType | undefined
      let status: Status | undefined
      let adopter: Adopter | undefined
      const queryRunner = this.dataSource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()
      if (createCatDto.adopter_id){
        adopter = await this.adopterService.findOne(createCatDto.adopter_id)
      }
      status = await this.statusService.findOne(createCatDto.status_id)
      if (createCatDto.color_type_id){
        colorType = await this.colorTypeService.findOne(createCatDto.color_type_id)
      }
      try{
          const catRepository = queryRunner.manager.getRepository(Cat)
          const cat = catRepository.create({
            ...createCatDto, 
            color_type: colorType, 
            status: status, 
            adopter: adopter
          })
          const savedCat = await catRepository.save(cat)
          if(files?.length){
              await this.filesService.createMany(
                  files,
                  {
                      category: FileCategory.CAT_PHOTO,
                      type: FileType.PHOTO,
                      is_approved: true,
                      cat_id: savedCat.id
                  }, queryRunner.manager
              )
          }
          await queryRunner.commitTransaction()
          return savedCat
      }catch(err){
          await queryRunner.rollbackTransaction()
          throw err
      }finally{
          await queryRunner.release()
      }
  }

  async findAll() {
    return await this.catRepository.find({
      relations: ['adopter', 'color_type', 'status', 'adopt_applications', 'files']
    })
  }

  async findOne(id: number) {
    const cat = await this.catRepository.findOne({
      where: {id}, 
      relations: ['adopter', 'color_type', 'status', 'adopt_applications', 'files']
    })
    if (!cat) throw new NotFoundException()
    return cat
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.findOne(id)
    let colorType: ColorType | undefined
    let status: Status | undefined
    let adopter: Adopter | undefined
    if (updateCatDto.color_type_id){
      colorType = await this.colorTypeService.findOne(updateCatDto.color_type_id)
      cat.color_type = colorType
    }
    if (updateCatDto.status_id){
      status = await this.statusService.findOne(updateCatDto.status_id)
      cat.status = status
    }
    if (updateCatDto.adopter_id){
      adopter = await this.adopterService.findOne(updateCatDto.adopter_id)
      cat.adopter = adopter
    }
    this.catRepository.merge(cat, updateCatDto)
    return await this.catRepository.save(cat)
  }

  async remove(id: number) {
   const cat = await this.findOne(id)
   return await this.catRepository.remove(cat)
  }
}
