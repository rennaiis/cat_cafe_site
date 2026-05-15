import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>
  ){}
  
  async create(createRuleDto: CreateRuleDto): Promise<Rule> {
    const rule = this.ruleRepository.create(createRuleDto);
    return await this.ruleRepository.save(rule);
  }

  async findAll(): Promise<Rule[]> {
    return await this.ruleRepository.find();
  }

  async findOne(id: number): Promise<Rule> {
    const rule = await this.ruleRepository.findOneBy({ id });
    if (!rule) {
      throw new NotFoundException(`rule ${id} not found`);
    }
    return rule;
  }

  async update(id: number, updateRuleDto: UpdateRuleDto): Promise<Rule> {
    const rule = await this.findOne(id);
    const updatedRule = this.ruleRepository.merge(rule, updateRuleDto);
    return await this.ruleRepository.save(updatedRule);
  }

  async remove(id: number): Promise<void> {
    const rule = await this.findOne(id);
    await this.ruleRepository.remove(rule);
  }

}
