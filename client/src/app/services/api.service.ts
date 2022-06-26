import { Todo } from '../shared/models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projects } from '../shared/models/models';
import { environment } from 'src/environments/environment';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class apiService {
  constructor(private _httpClient: HttpClient) {}

  private _url = environment.apiURL;
  private _refreshRequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshRequired;
  }

  getProjects(): Observable<Projects[]> {
    return this._httpClient.get<Projects[]>(this._url + '/projects');
  }

  postTodo(todo: Todo) {
    const body = { project: todo.project, title: todo.title };
    return this._httpClient
      .post<Todo[]>(this._url + '/projects/todos', body)
      .pipe(tap(() => this._refreshRequired.next()));
  }

  patchTodo(projectId: number, todoId: number) {
    return this._httpClient
      .patch(this._url + '/projects/' + projectId + '/todos/' + todoId, '')
      .pipe(tap(() => this._refreshRequired.next()));
  }

  deleteTodo(todoId: number): Observable<number> {
    return this._httpClient
      .delete<number>(this._url + '/projects/todos/' + todoId)
      .pipe(tap(() => this._refreshRequired.next()));
  }

  deleteProject(projectId: number): Observable<number> {
    return this._httpClient
      .delete<number>(this._url + '/projects/' + projectId)
      .pipe(tap(() => this._refreshRequired.next()));
  }
}
