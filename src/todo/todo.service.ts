import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddItemDto } from '../dto/AddItemDto';
import { updatedto } from '../dto/updatedto';
import { Errors } from '../erreur';
import { TodoModel } from '../TodoModel';
import { TodoEntity } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { TodoStatusEnum } from 'src/TodoStatusEnum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  @Inject('UUID') uuid: () => string;
  private todos = [];
  private myerrors = new Errors();
  getTodos() {
    return this.todos;
  }
  createTodo2(newTodo: AddItemDto) {
    const { name, description } = newTodo;
    this.myerrors.descriptionError(description);
    this.myerrors.nameError(name);
    const todo = new TodoModel(name, description);
    this.todos.push(todo);
    return this.todos;
  }
  async createTodo(newTodo: AddItemDto) {
    return await this.todoRepository.save(newTodo);
  }
  getTodoById(id: string) {
    const todo = this.todos.find((Todo) => Todo.id == id);
    if (!todo) {
      throw new NotFoundException(`aucun todo portant l'id ${id}`);
    }
    return todo;
  }
  async getTodobyID(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOneById(id);
    if (!todo) {
      throw new NotFoundException(`aucun todo portant l'id ${id}`);
    }
    return todo;
  }
  deleteTodoById(id: string) {
    this.todos = this.todos.filter((item) => item.id !== id);
    return 'done';
  }
  async delete(id: number) {
    return await this.todoRepository.delete(id);
  }
  updateTodo2(updatedTodo: updatedto, id: string) {
    const { name, description } = updatedTodo;
    const todo = this.todos.find((item) => item.id == id);
    this.myerrors.descriptionError(description);
    this.myerrors.descriptionError(name);
    todo.name = name ? name : todo.name;
    todo.description = description ? description : todo.description;
    return { todo, message: 'the item was updated successfully' };
  }
  async updateTodo(updatedTodo: updatedto, id: number) {
    const todo = await this.todoRepository.findOneById(id);
    if (!todo) {
      console.log(todo, id);
      throw new NotFoundException(`todo de l id ${id} n'existe pas`);
    }
    console.log(todo, id);
    const newTodo = await this.todoRepository.preload({
      id,
      ...updatedTodo,
    });
    return await this.todoRepository.save(newTodo);
  }
  async softDelete(id: number) {
    return await this.todoRepository.softDelete(id);
  }
  async restoreTodo(id: number) {
    return await this.todoRepository.restore(id);
  }
  async todoByStatus() {
    const qb = this.todoRepository.createQueryBuilder('todo');
    qb.select('todo.status, count(todo.id) as number').groupBy('todo.status');
    console.log(qb.getSql());
    return qb.getRawMany();
  }
  async getTodo() {
    return await this.todoRepository.find();
  }
  async todoByDescripStatus(
    chaine: string,
    status: TodoStatusEnum,
  ): Promise<TodoEntity[]> {
    let qb = this.todoRepository.createQueryBuilder('todo');
    if (chaine) {
      qb = qb.andWhere(
        '(LOWER(todo.description) LIKE LOWER (%:chaine%) OR LOWER(todo.name) LIKE LOWER(%:chaine%))',
        { chaine: `%{chaine}` },
      );
    }

    if (status) {
      qb = qb.andWhere('LOWER(todo.status) = LOWER(:status)', { status });
    }
    return qb.getMany();
  }
  async getByStringAndStatus(chaine: string, status: TodoStatusEnum) {
    let qb = this.todoRepository.createQueryBuilder('todo');
    if (chaine) {
      qb = qb
        .andWhere('LOWER(todo.name) LIKE LOWER(%:chaine%)', { chaine })
        .orWhere('LOWER(todo.description) LIKE LOWER(%:chaine%)', { chaine });
    }
    if (status) {
      qb = qb.andWhere('todo.status = :status', { status });
    }
    return qb.getMany();
  }
  async pagination(
    page = 1,
    limit = 10,
  ): Promise<{ items: TodoEntity[]; total: number }> {
    const [items, total] = await this.todoRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return { items, total };
  }
}
