/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';
import { TodoStatusEnum } from 'src/TodoStatusEnum';

export class statusCriteriaDto {
  @IsOptional()
  status: TodoStatusEnum;
  @IsOptional()
  criteria: string;
}
