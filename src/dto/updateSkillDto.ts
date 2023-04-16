/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class updateSkillDto {
  @IsString()
  @IsOptional()
  designation: string;
}
