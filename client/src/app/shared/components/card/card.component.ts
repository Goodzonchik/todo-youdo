import { ApiService } from './../../../services/api.service';
import { Component, Input } from '@angular/core';
import { Todo } from '../../models/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  constructor(private _api: ApiService) {}

  @Input() projectId: number;
  @Input() title: string;
  @Input() todos: Todo[];

  removeProject(projectId: number) {
    this._api.deleteProject(projectId);
  }

  removeTodo(todoId: number) {
    this._api.deleteTodo(todoId);
  }

  updateTodo(projectId: number, todoId: number) {
    this._api.patchTodo(projectId, todoId);
  }
}
