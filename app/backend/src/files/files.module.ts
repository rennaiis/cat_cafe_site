import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { CatsModule } from '../cats/cats.module';
import { ColorTypesModule } from '../color_types/color_types.module';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), CatsModule, ColorTypesModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
