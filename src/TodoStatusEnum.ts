/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
export enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}
export class StatusValidation {
  @IsEnum(TodoStatusEnum, {
    message: `Status invalide`,
  })
  status: TodoStatusEnum;
}
