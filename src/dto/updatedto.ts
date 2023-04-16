/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';
import { StatusValidation, TodoStatusEnum } from '../TodoStatusEnum';

export class updatedto {
  @IsOptional()
  @Min(3)
  @Max(10)
  name: string;
  @IsOptional()
  @Min(10)
  description: string;
  @IsOptional()
  @Type(() => StatusValidation)
  status: TodoStatusEnum;
}
