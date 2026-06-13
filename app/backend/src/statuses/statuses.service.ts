import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>
  ){}
  async create(createStatusDto: CreateStatusDto) {
    const newStatus = this.statusRepository.create(createStatusDto)
    return await this.statusRepository.save(newStatus)
  }

  async findAll() {
    return await this.statusRepository.find({
      // relations: ['cats']
    })
  }

  async findOne(id: number) {
    const status = await this.statusRepository.findOne({
      where: {id}, 
      // relations: ['cats']
    })
    if (!status){
      throw new NotFoundException('no status with this id')
    }
    return status
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const status = await this.findOne(id);
    const updatedStatus = this.statusRepository.merge(status, updateStatusDto)
    return await this.statusRepository.save(updatedStatus)
  }

  async remove(id: number) {
    const status = await this.findOne(id);
    await this.statusRepository.remove(status)
  }
}
