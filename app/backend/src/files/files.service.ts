import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { Cat } from '../cats/entities/cat.entity';
import { ColorType } from '../color_types/entities/color_type.entity';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(ColorType)
    private readonly colorTypeRepository: Repository<ColorType>
  ){}
  async create(createFileDto: CreateFileDto) {
    const file = this.fileRepository.create(createFileDto)
    return await this.fileRepository.save(file)
  }

  async createMany(
    files: Express.Multer.File[], 
    createFileDto: CreateFileDto
  ): Promise<FileEntity[]> {
    if (!files || files.length === 0){
      throw new BadRequestException;
    }
    let attachedCat: Cat | null = null
    let attachedColorType: ColorType | null = null
    try{
      if (createFileDto.cat_id){
        attachedCat = await this.catRepository.findOne({
          where: {id: Number(createFileDto.cat_id)}
        })
        if (!attachedCat){
          throw new NotFoundException('no cat with this id in db')
        }
      }
      if (createFileDto.color_type_id){
        attachedColorType = await this.colorTypeRepository.findOne({
          where: {id: Number(createFileDto.color_type_id)}
        })
        if (!attachedColorType){
          throw new NotFoundException('no color type with this id in db')
        }
      }
    }catch(error){
      this.deletePhysicalFiles(files)
      throw error 
    }

    const savedFiles = await Promise.all(files.map(async(file)=>{
      const newFile = this.fileRepository.create({
        name: file.originalname,
        path: file.filename,
        category: createFileDto.category, 
        type: createFileDto.type, 
        cat: attachedCat, 
        colorType: attachedColorType           
      })
      const saved = await this.fileRepository.save(newFile)
      return saved
    }))
    return savedFiles
  }

  private deletePhysicalFiles(
    files: Express.Multer.File[]
    ){
    files.forEach(file => {
      if (fs.existsSync(file.path)){
        fs.unlinkSync(file.path)
      }
    })
  }
  
  async findAll() {
    return await this.fileRepository.find({
      relations: ['cat', 'colorType']
    })
  }

  async findOne(id: number) {
    const file = await this.fileRepository.findOne({
      where: {id}, 
      relations: ['cat', 'colorType']
    })
    if (!file){
      throw new NotFoundException('no file with this id')
    }
    return file;
  }

  async approve(id: number){
    const file = await this.findOne(id)
    file.is_approved = true
    return await this.fileRepository.save(file)
  }

  async remove(id: number) {
    const file = await this.findOne(id)
    const fullPath = `./uploads/${file.path}`
    if (fs.existsSync(fullPath)){
        fs.unlinkSync(fullPath)
    }
    await this.fileRepository.remove(file)
  }
}
