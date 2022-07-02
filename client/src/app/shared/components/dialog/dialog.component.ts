import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Category, ProjectBody, TodoBody } from '../../models/models';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _api: ApiService,
    private _dialogRef: MatDialogRef<DialogComponent>,
    private _snackBar: MatSnackBar
  ) {}

  projectForm!: FormGroup;
  categories$: Observable<Category[]>;

  projectTitleControl = new FormControl('', Validators.required);
  todoTitleControl = new FormControl('', Validators.required);
  newProjectControl = new FormControl('', Validators.required);

  ngOnInit() {
    this.projectForm = this._formBuilder.group({
      projectTitle: this.projectTitleControl,
      todoTitle: this.todoTitleControl,
      newProject: this.newProjectControl,
    });
    this.categories$ = this._api.categories$;
  }

  makeTodo() {
    const body: TodoBody = {
      title: this.todoTitleControl.value!,
      projectId: parseInt(this.projectTitleControl.value!),
    };
    this._api.postTodo(body);
    this._dialogRef.close();
  }
  makeProject() {
    const body: ProjectBody = {
      title: this.newProjectControl.value!,
      todos: [],
    };
    this._api.postProject(body);
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 1500,
      data: body.title,
    });
    this.projectForm.reset();
  }
}
