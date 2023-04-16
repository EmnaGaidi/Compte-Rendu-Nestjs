/* eslint-disable prettier/prettier */
import { SkillEntity } from '@skill/entities/skill.entity/skill.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddCvDto {
  @IsString()
  name: string;
  @IsString()
  firstname: string;
  @IsNumber()
  age: number;
  @IsNumber()
  cin: number;
  @IsString()
  job: string;
  @IsString()
  path: string;
  @IsOptional()
  skills: SkillEntity[];
  constructor(
    name: string,
    firstname: string,
    age: number,
    path: string,
    cin: number,
    job: string,
  ) {
    this.name = name;
    this.firstname = firstname;
    this.age = age;
    this.cin = cin;
    this.job = job;
    this.path = path;
    this.skills = [];
  }
}
