import { Module } from '@nestjs/common';
import { AdoptApplicationsService } from './adopt_applications.service';
import { AdoptApplicationsController } from './adopt_applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptApplication } from './entities/adopt_application.entity';
import { CatsModule } from '../cats/cats.module';
import { AdoptersModule } from '../adopters/adopters.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdoptApplication]), AdoptApplicationsModule, CatsModule, AdoptersModule], 
  controllers: [AdoptApplicationsController],
  providers: [AdoptApplicationsService],
  exports: [TypeOrmModule, AdoptApplicationsService]
})
export class AdoptApplicationsModule {}
