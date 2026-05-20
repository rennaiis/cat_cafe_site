import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from '../hashVerify';
import { Employee } from '../employees/entities/employee.entity';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly employeeService: EmployeesService
  ) {}
  async create(createUserDto: CreateUserDto) {
     const candidate = await this.findByLogin(createUserDto.login)
     if (candidate){
      throw new ConflictException('Пользователь с таким логином уже есть')
    }
    let employee: Employee | undefined = undefined
    if (createUserDto.employee_id){
      employee = await this.employeeService.findOne(createUserDto.employee_id)
    }
    const hashedPass = await hashPassword(createUserDto.password_hash)
    const user = this.userRepository.create({
      ...createUserDto, 
      password_hash: hashedPass,
      employee: employee
    })
    return await this.userRepository.save(user)
  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['employee'], 
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!user) throw new NotFoundException()
    return user
  }

  async findByLogin(login: string){
    const user = await this.userRepository.findOne({
      where: {login: login},
      relations: ['employee']
    })
    return user
  }

async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id); 
    let employee: Employee | undefined
    if (updateUserDto.password_hash) {
      updateUserDto.password_hash = await hashPassword(updateUserDto.password_hash);
    }
    this.userRepository.merge(user, updateUserDto);
    if (updateUserDto.employee_id) {
      employee = await this.employeeService.findOne(updateUserDto.employee_id);
      user.employee = employee;
    }
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.softRemove(user);
  }
}
