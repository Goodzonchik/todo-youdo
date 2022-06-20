import { CreateTodoDto } from './todo.dto';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { ProjectService } from '../project/project.service';

@Injectable()
export class TodoService {
  @Inject(ProjectService)
  private readonly projectService: ProjectService;

  @InjectRepository(Todo)
  private readonly todoRepository: Repository<Todo>;

  async createTodo(body: CreateTodoDto): Promise<Todo> {
    const todo: Todo = new Todo();
    const project = await this.projectService.findProject(body.project);
    todo.title = body.title;
    todo.project = project;
    return this.todoRepository.save(todo);
  }

  async changeTodoStatus(projectId: number, todoId: number): Promise<Todo> {
    const todo = await this.todoRepository
      .createQueryBuilder()
      .select('todo')
      .from(Todo, 'todo')
      .where('todo.id = :todoId', { todoId: todoId })
      .andWhere('todo.projectId = :projectId', { projectId: projectId })
      .getOne();
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      await this.todoRepository.save(todo);
    }
    return todo;
  }
}
