import { DialogComponent } from './../dialog/dialog.component';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Projects } from '../../models/models';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(public dialog: MatDialog) {}

  @Input() projects: Projects[];

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      disableClose: true,
      minHeight: '250px',
      data: this.projects,
    });
  }
}
