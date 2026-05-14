import { Module } from '@nestjs/common';
import { LandingDataService } from './landing-data.service';
import { LandingDataController } from './landing-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingData } from './entities/landing-data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LandingData])
  ],
  controllers: [LandingDataController],
  providers: [LandingDataService],
})
export class LandingDataModule {}
