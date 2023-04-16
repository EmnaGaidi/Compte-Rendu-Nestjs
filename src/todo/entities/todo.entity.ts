/* eslint-disable prettier/prettier */
import { TimeEntities } from '../../Generics/time.entities';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { StatusValidation, TodoStatusEnum } from '../../TodoStatusEnum';
import { Type } from 'class-transformer';
@Entity('todo')
export class TodoEntity extends TimeEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'name',
    length: 10,
  })
  name: string;
  @Column({
    name: 'description',
    length: 50,
  })
  description: string;
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.actif,
  })
  @Type(() => StatusValidation)
  status: TodoStatusEnum;
}
