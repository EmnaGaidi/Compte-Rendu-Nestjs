/* eslint-disable prettier/prettier */
import { TodoStatusEnum } from './TodoStatusEnum';
import { v4 as uuidv4 } from 'uuid';
export class TodoModel {
  id: string;
  name: string;
  description: string;
  date: Date;
  statut: TodoStatusEnum;
  constructor(name: string, description: string) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.date = new Date();
    this.statut = TodoStatusEnum.waiting;
  }
}
