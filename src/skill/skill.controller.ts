import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { AddSkillDto } from '../dto/AddSkillDto';
import { updateSkillDto } from '../dto/updateSkillDto';

@Controller('skill')
export class SkillController {
  constructor(private service: SkillService) {}
  //@Get()
  //async addCvAvecDonnéesFictives() {
  //return await this.service.addSkillparDonnéesFictives();
  //}
  @Get('all')
  async allSkills() {
    return await this.service.getSkills();
  }
  @Post()
  async AddSkill(@Body() skill: AddSkillDto) {
    return await this.service.createSkill(skill);
  }
  @Get(':id')
  async getSkillByid(@Param('id', ParseIntPipe) id) {
    return await this.service.getSkillById(id);
  }
  @Patch('update/:id')
  async updateSkill(
    @Param('id', ParseIntPipe) id,
    @Body() updateskill: updateSkillDto,
  ) {
    return await this.service.updateSkill(id, updateskill);
  }
  @Delete(':id')
  async deleteSkill(@Param('id') id) {
    return this.service.deleteSkill(id);
  }
}
