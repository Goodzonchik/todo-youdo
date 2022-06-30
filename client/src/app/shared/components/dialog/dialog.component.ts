import { ApiService } from '../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Category, Project, Todo } from '../../models/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _api: ApiService,
    private _dialogRef: MatDialogRef<DialogComponent>
  ) {}

  projectForm!: FormGroup;
  projects: Project[];
  category: Category[];

  projectTitleControl = new FormControl('', Validators.required);
  todoTitleControl = new FormControl('', Validators.required);
  newCategoryControl = new FormControl('', Validators.required);

  ngOnInit() {
    this.projectForm = this._formBuilder.group({
      projectTitle: this.projectTitleControl,
      todoTitle: this.todoTitleControl,
      newCategory: this.newCategoryControl,
    });

    this.category = this._api.getCategories();
  }

  makeTodo() {
    const todo = new Todo();
    todo.title = this.todoTitleControl.value!;
    if (this.projectTitleControl.value == '0') {
      todo.project = this.newCategoryControl.value!;
    } else {
      todo.project =
        this.category[parseInt(this.projectTitleControl.value!)].value;
    }
    this._api.postTodo(todo);
    this._dialogRef.close();
  }
}
