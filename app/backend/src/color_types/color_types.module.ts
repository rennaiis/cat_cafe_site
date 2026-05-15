import { Module } from '@nestjs/common';
import { ColorTypesService } from './color_types.service';
import { ColorTypesController } from './color_types.controller';

@Module({
  controllers: [ColorTypesController],
  providers: [ColorTypesService],
})
export class ColorTypesModule {}
