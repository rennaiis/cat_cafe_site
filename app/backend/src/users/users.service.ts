import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const candidate = await this.findByLogin(createUserDto.login)
    if (candidate != null){
      throw new ConflictException('Пользователь с таким логином уже есть')
    }
    const hashedPass = await hash(createUserDto.password_hash)
    const user = this.userRepository.create({
      ...createUserDto, 
      password_hash: hashedPass
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
    this.userRepository.merge(user, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.softRemove(user);
  }
}
