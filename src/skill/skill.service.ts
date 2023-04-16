import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity/skill.entity';
import { Repository } from 'typeorm';
import { randSkill } from '@ngneat/falso';
import { AddSkillDto } from '../dto/AddSkillDto';
import { updateSkillDto } from '../dto/updateSkillDto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private skillRepository: Repository<SkillEntity>,
  ) {}
  //async addSkillparDonnéesFictives() {
  //const s = randSkill();
  //const skill = new AddSkillDto(s);
  //return await this.skillRepository.save(skill);
  //}
  async add(skill: AddSkillDto) {
    return await this.skillRepository.save(skill);
  }
  async createSkill(skill: AddSkillDto): Promise<SkillEntity> {
    return await this.skillRepository.save(skill);
  }
  async getSkills(): Promise<SkillEntity[]> {
    return this.skillRepository.find();
  }
  async getSkillById(id: number): Promise<SkillEntity> {
    const skill = await this.skillRepository.findOneById(id);
    if (!skill) {
      throw new NotFoundException(`Le skill d'id ${id} n'existe pas`);
    }
    return skill;
  }
  async updateSkill(
    id: number,
    updateskill: updateSkillDto,
  ): Promise<SkillEntity> {
    const newskill = await this.skillRepository.preload({
      id,
      ...updateskill,
    });
    if (!newskill) {
      throw new NotFoundException(`Le skill d'id ${id} n'existe pas`);
    }
    return await this.skillRepository.save(newskill);
  }
  async deleteSkill(id: number) {
    return await this.skillRepository.delete(id);
  }
}
