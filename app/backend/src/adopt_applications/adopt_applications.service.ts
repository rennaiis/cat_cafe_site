import { Injectable } from '@nestjs/common';
import { CreateAdoptApplicationDto } from './dto/create-adopt_application.dto';
import { UpdateAdoptApplicationDto } from './dto/update-adopt_application.dto';

@Injectable()
export class AdoptApplicationsService {
  create(createAdoptApplicationDto: CreateAdoptApplicationDto) {
    return 'This action adds a new adoptApplication';
  }

  findAll() {
    return `This action returns all adoptApplications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adoptApplication`;
  }

  update(id: number, updateAdoptApplicationDto: UpdateAdoptApplicationDto) {
    return `This action updates a #${id} adoptApplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} adoptApplication`;
  }
}
