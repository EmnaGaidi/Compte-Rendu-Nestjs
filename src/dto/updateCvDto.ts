/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCvDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  firstname: string;
  @IsOptional()
  @IsNumber()
  age: number;
  @IsOptional()
  @IsNumber()
  cin: number;
  @IsOptional()
  @IsString()
  job: string;
  @IsString()
  @IsOptional()
  path: string;
}
