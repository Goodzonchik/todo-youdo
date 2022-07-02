import { Category, ProjectBody, TodoBody, Todo } from '../shared/models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../shared/models/models';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _httpClient: HttpClient) {}

  private _url = environment.apiURL;
  private _projects: Project[] = [];
  private _categories: Category[] = [];

  private _afterDeleteProject(projectId: number) {
    const projectIndex = this._projectIndexById(projectId);
    if (projectIndex != -1) {
      this._projects.splice(projectIndex, 1);
    }
    this.projects$.next(this._projects);
  }

  private _afterDeleteTodo(todoId: number) {
    this._projects.forEach((project) => {
      const todoIndex = this._todoIndexById(project, todoId);
      if (todoIndex != -1) {
        project.todos.splice(todoIndex, 1);
      }
    });
  }
  private _afterPatchTodo(projectId: number, todoId: number) {
    const projectIndex = this._projectIndexById(projectId);
    const todoIndex = this._todoIndexById(this._projects[projectIndex], todoId);
    this._projects[projectIndex].todos[todoIndex].isCompleted =
      !this._projects[projectIndex].todos[todoIndex].isCompleted;
    this.projects$.next(this._projects);
  }

  private _deleteCategory(projectId: number) {
    const categoryIndex = this._categories.findIndex((category) => {
      return category.id == projectId;
    });
    if (categoryIndex != -1) {
      this._categories.splice(categoryIndex, 1);
    }
    this.categories$.next(this._categories);
  }

  private _todoIndexById(project: Project, todoId: number): number {
    const todoIndex = project.todos.findIndex((todo) => {
      return todo.id == todoId;
    });
    return todoIndex;
  }

  private _projectIndexById(projectId: number): number {
    const projectIndex = this._projects.findIndex((project) => {
      return project.id == projectId;
    });
    return projectIndex;
  }

  public projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(
    []
  );
  public categories$: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);

  public getCategories() {
    this._categories = [{ id: 'uid', title: 'Новая категория' }];
    for (let i = 0; i < this._projects.length; i++) {
      this._categories.push({
        id: this._projects[i].id,
        title: this._projects[i].title,
      });
    }
    this.categories$.next(this._categories);
  }

  public getProjects() {
    this._httpClient
      .get<Project[]>(this._url + '/projects')
      .subscribe((projects) => {
        this._projects = projects;
        this.projects$.next(this._projects);
        this.getCategories();
      });
  }

  public postTodo(body: TodoBody) {
    return this._httpClient
      .post<Todo>(this._url + '/projects/todos', body)
      .subscribe((todo) => {
        const project = this._projects.find(
          (project) => project.id === todo.project.id
        );
        project?.todos.push(todo);
        this.projects$.next(this._projects);
      });
  }

  public postProject(body: ProjectBody) {
    return this._httpClient
      .post<Project>(this._url + '/projects', body)
      .subscribe((project) => {
        this._projects.push(project);
        this._categories.push({
          id: project.id,
          title: project.title,
        });
        this.categories$.next(this._categories);
        this.projects$.next(this._projects);
      });
  }

  public patchTodo(projectId: number, todoId: number) {
    return this._httpClient
      .patch(this._url + '/projects/' + projectId + '/todos/' + todoId, '')
      .subscribe(() => {
        this._afterPatchTodo(projectId, todoId);
      });
  }

  public deleteProject(projectId: number) {
    return this._httpClient
      .delete<Project>(this._url + '/projects/' + projectId)
      .subscribe(() => {
        this._afterDeleteProject(projectId);
        this._deleteCategory(projectId);
      });
  }

  public deleteTodo(todoId: number) {
    return this._httpClient
      .delete<Todo>(this._url + '/projects/todos/' + todoId)
      .subscribe(() => {
        this._afterDeleteTodo(todoId);
        this.projects$.next(this._projects);
      });
  }
}
