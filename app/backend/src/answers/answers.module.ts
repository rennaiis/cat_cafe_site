import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionsModule } from '../questions/questions.module';
import { AdoptApplicationsModule } from '../adopt_applications/adopt_applications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]),  QuestionsModule, AdoptApplicationsModule],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [TypeOrmModule, AnswersService]
})
export class AnswersModule {}
