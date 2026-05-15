import { Module } from '@nestjs/common';
import { AdoptApplicationsService } from './adopt_applications.service';
import { AdoptApplicationsController } from './adopt_applications.controller';

@Module({
  controllers: [AdoptApplicationsController],
  providers: [AdoptApplicationsService],
})
export class AdoptApplicationsModule {}
