import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

interface Projects {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public edited = false;
  selectedValue: string = '';

  projects: Projects[] = [
    { value: '0', viewValue: 'Новая категория' },
    { value: '1', viewValue: 'Работа' },
    { value: '2', viewValue: 'Отдых' },
  ];

  TodoTitleFormControl = new FormControl('', [Validators.required]);
}
