import { Module } from '@nestjs/common';
import { AdoptersService } from './adopters.service';
import { AdoptersController } from './adopters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adopter } from './entities/adopter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adopter])],
  controllers: [AdoptersController],
  providers: [AdoptersService],
})
export class AdoptersModule {}
