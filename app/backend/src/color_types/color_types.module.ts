import { Module } from '@nestjs/common';
import { ColorTypesService } from './color_types.service';
import { ColorTypesController } from './color_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorType } from './entities/color_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColorType])],
  controllers: [ColorTypesController],
  providers: [ColorTypesService],
  exports: [TypeOrmModule]
})
export class ColorTypesModule {}
