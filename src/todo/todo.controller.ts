import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AddItemDto } from '../dto/AddItemDto';
import { updatedto } from '../dto/updatedto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private service: TodoService) {}
  private todos = [];
  @Get()
  async getTodos() {
    return await this.service.getTodo();
  }
  @Get('byStatus')
  async todoByStatus() {
    return await this.service.todoByStatus();
  }
  @Get('getPaginated/:page/:limit')
  async getPaginated(
    @Param('page', ParseIntPipe) page,
    @Param('limit', ParseIntPipe) limit,
  ) {
    return await this.service.pagination(page, limit);
  }
  @Get('byid/:id')
  getTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getTodobyID(id);
  }
  @Post()
  createTodo(@Body() newTodo: AddItemDto) {
    const { name, description } = newTodo;
    const todo = new AddItemDto();
    todo.name = name;
    todo.description = description;
    return this.service.createTodo(todo);
  }
  @Delete(':id')
  async deleteTodoById(@Param('id', ParseIntPipe) id) {
    return await this.service.delete(id);
  }
  @Patch(':id')
  async updateTodo(
    @Body() updatedTodo: updatedto,
    @Param('id', ParseIntPipe) id,
  ) {
    //const { name, description } = updatedTodo;
    return await this.service.updateTodo(updatedTodo, id);
  }
}
