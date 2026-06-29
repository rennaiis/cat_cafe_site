import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { EntityManager, Repository } from 'typeorm';
import { Cat } from '../cats/entities/cat.entity';
import { ColorType } from '../color_types/entities/color_type.entity';
import * as fs from 'fs';
import { CatsService } from '../cats/cats.service';
import { ColorTypesService } from '../color_types/color_types.service';
import sharp from 'sharp';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly colorTypeService: ColorTypesService
  ){}
  async create(createFileDto: CreateFileDto) {
    const file = this.fileRepository.create(createFileDto)
    return await this.fileRepository.save(file)
  }

  async createMany(
  files: Express.Multer.File[],
  createFileDto: CreateFileDto,
  manager?: EntityManager
  ): Promise<FileEntity[]> {
    const repository = manager ? manager.getRepository(FileEntity):this.fileRepository
    if (!files || files.length === 0){
      throw new BadRequestException("put some files");
    }
    let attachedColorType: ColorType | undefined
    const uploadFolder = './catFiles'
    if (!fs.existsSync(uploadFolder)){
      fs.mkdirSync(uploadFolder, { recursive: true })
    }

    try{
      if (createFileDto.color_type_id){
        attachedColorType = await this.colorTypeService.findOne(
          createFileDto.color_type_id
        )
      }
    }catch(error){
      throw error
    }

    const savedFiles = await Promise.all(
      files.map(async(file) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const filename = unique + '.webp'
        const filePath = join(uploadFolder, filename)
        await sharp(file.buffer)
          .resize({
            width: 1200,
            withoutEnlargement: true
          })
          .webp({ quality: 75 })
          .toFile(filePath)

        const newFile = repository.create({
          name: file.originalname,
          path: filename,
          category: createFileDto.category,
          type: createFileDto.type,
          cat: createFileDto.cat_id ? ({ id: createFileDto.cat_id } as Cat) : undefined,
          colorType: attachedColorType, 
          is_approved: createFileDto.is_approved
        })
        const saved = await repository.save(newFile)
        return saved
      })
    )
    return savedFiles
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
    const fullPath = `./catFiles/${file.path}`
    if (fs.existsSync(fullPath)){
        fs.unlinkSync(fullPath)
    }
    await this.fileRepository.remove(file)
  }
}
