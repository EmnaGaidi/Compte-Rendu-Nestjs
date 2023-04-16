/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class AddSkillDto {
  @IsString()
  designation: string;
  constructor(d: string) {
    this.designation = d;
  }
}
