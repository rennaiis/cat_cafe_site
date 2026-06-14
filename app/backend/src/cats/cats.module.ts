import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { StatusesModule } from '../statuses/statuses.module';
import { AdoptersModule } from '../adopters/adopters.module';
import { ColorTypesModule } from '../color_types/color_types.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), ColorTypesModule, StatusesModule, AdoptersModule, FilesModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [TypeOrmModule, CatsService]
})
export class CatsModule {}
