import { apiService } from '../../../services/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Projects, Todo } from '../../models/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Category {
  index: number;
  value: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Projects[],
    private _formBuilder: FormBuilder,
    private _api: apiService,
    private _dialogRef: MatDialogRef<DialogComponent>
  ) {}

  projectForm!: FormGroup;
  projects: Projects[];
  category: Category[] = [{ index: 0, value: 'Новая категория' }];

  projectTitleControl = new FormControl('', Validators.required);
  todoTitleControl = new FormControl('', Validators.required);
  newCategoryControl = new FormControl('', Validators.required);

  ngOnInit() {
    this.projectForm = this._formBuilder.group({
      projectTitle: this.projectTitleControl,
      todoTitle: this.todoTitleControl,
      newCategory: this.newCategoryControl,
    });

    this.projects = this.data;
    this.category = this.createCategory();
  }

  createCategory(): Category[] {
    for (let i = 0; i < this.projects.length; i++) {
      this.category.push({
        index: i + 1,
        value: this.projects[i].title,
      });
    }
    return this.category;
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
    this._api.postTodo(todo).subscribe(() => {
      this._dialogRef.close();
    });
  }
}
