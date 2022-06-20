import { Todo } from './todo.entity';
import { CreateTodoDto } from './todo.dto';
import {
  Body,
  Controller,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('projects')
export class TodoController {
  @Inject(TodoService)
  private readonly service: TodoService;

  @Post('todos')
  public createTodo(@Body() body: CreateTodoDto): Promise<Todo> {
    return this.service.createTodo(body);
  }

  @Patch(':projectid/todos/:todoid')
  public changeTodoStatus(
    @Param('projectid', ParseIntPipe) projectId: number,
    @Param('todoid', ParseIntPipe) todoId: number,
  ): Promise<Todo> {
    return this.service.changeTodoStatus(projectId, todoId);
  }
}
