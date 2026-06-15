import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { QuestionsService } from '../questions/questions.service';
import { AdoptApplicationsService } from '../adopt_applications/adopt_applications.service';

@Injectable()
export class AnswersService {

  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private readonly questionsService: QuestionsService,
    private readonly adoptApplicationsService: AdoptApplicationsService,
  ){}

  async create(createAnswerDto: CreateAnswerDto) {
    const question = await this.questionsService.findOne(createAnswerDto.question_id);
    const application = await this.adoptApplicationsService.findOne(createAnswerDto.application_id);

    const answer = await this.answerRepository.create({
      ...createAnswerDto,
      question: question, 
      application: application

    });

    return await this.answerRepository.save(answer);
  }

  async findAll() {
    return await this.answerRepository.find({
      relations: ['question', 'application'],
    });
  }

  async findOne(id: number) {
    const answer = await this.answerRepository.findOne({
      where: { id },
      relations: ['question', 'application'],
    });
    
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return answer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.findOne(id);

    if (updateAnswerDto.question_id) {
      const question = await this.questionsService.findOne(updateAnswerDto.question_id);
      answer.question = question;
    }

    if (updateAnswerDto.application_id) {
      const adoptApplication = await this.adoptApplicationsService.findOne(updateAnswerDto.application_id);
      answer.application = adoptApplication;
    }

    this.answerRepository.merge(answer, updateAnswerDto);
    return await this.answerRepository.save(answer);
  }

  async remove(id: number) {
    const answer = await this.findOne(id);
    return await this.answerRepository.remove(answer);
  }
}


