import { Category, Todo, Todos } from '../shared/models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../shared/models/models';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _httpClient: HttpClient) {}

  private _url = environment.apiURL;
  private _refreshRequired = new Subject<void>();
  private _projects: Project[] = [];

  public projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(
    []
  );

  // get Refreshrequired() {
  //   return this._refreshRequired;
  // }

  public getCategories(): Category[] {
    const category: Category[] = [{ index: 0, value: 'Новая категория' }];
    for (let i = 0; i < this._projects.length; i++) {
      category.push({
        index: i + 1,
        value: this._projects[i].title,
      });
    }
    return category;
  }

  public getProjects() {
    this._httpClient
      .get<Project[]>(this._url + '/projects')
      .subscribe((projects) => {
        this._projects = projects;
        this.projects$.next(this._projects);
      });
  }

  public postTodo(todo: Todo) {
    const body = { project: todo.project, title: todo.title };
    return this._httpClient
      .post<Todos>(this._url + '/projects/todos', body)
      .subscribe(this._onPostTodo.bind(this));
  }

  private _onPostTodo(res: Todos) {
    const hasProject = !res.project.title;
    if (hasProject) {
      this._projects = this._projects.map((project) => {
        if (project.id == res.project.id) {
          return { ...project, todos: [...project.todos, res] };
        } else {
          return project;
        }
      });
    } else {
      this._projects.push({
        id: res.project.id,
        title: res.project.title,
        todos: [res],
      });
    }
    this.projects$.next(this._projects);
  }

  patchTodo(projectId: number, todoId: number) {
    return this._httpClient.patch(
      this._url + '/projects/' + projectId + '/todos/' + todoId,
      ''
    );
    // .pipe(tap(() => this._refreshRequired.next()));
  }

  //   deleteTodo(todoId: number): Observable<number> {
  //     return this._httpClient
  //       .delete<number>(this._url + '/projects/todos/' + todoId)
  //       .pipe(tap(() => this._refreshRequired.next()));
  //   }

  //   deleteProject(projectId: number): Observable<number> {
  //     return this._httpClient
  //       .delete<number>(this._url + '/projects/' + projectId)
  //       .pipe(tap(() => this._refreshRequired.next()));
  //   }
}
