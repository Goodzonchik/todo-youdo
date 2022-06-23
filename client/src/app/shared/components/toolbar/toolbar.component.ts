import { DialogComponent } from './../dialog/dialog.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: 'auto',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
