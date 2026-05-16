import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm/browser';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const newQuestion = this.questionRepository.create(createQuestionDto)
    return await this.questionRepository.save(newQuestion);
  }

  async findAll() {
    return await this.questionRepository.find(
      {relations: ['answers']}
    )
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: {id}, 
      relations: ['answers']
    })
    if (!question){
      throw new NotFoundException("no question with this id")
    }
    return question
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.findOne(id);
    const updatedQuestion = this.questionRepository.merge(question, updateQuestionDto);
    return await this.questionRepository.save(updatedQuestion);
  }

  async remove(id: number) {
    const question = await this.findOne(id);
    await this.questionRepository.remove(question);
  }
}
