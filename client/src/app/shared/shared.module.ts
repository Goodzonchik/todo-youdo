import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CardComponent } from './components/card/card.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { ArraySortLengthPipe } from './pipes/sort-by-length.pipe';
import { ArraySortFieldPipe } from './pipes/sort-by-field.pipe';

const materialModules = [
  MatToolbarModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatGridListModule,
  MatCardModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [
    ToolbarComponent,
    DialogComponent,
    CardComponent,
    GridListComponent,
    ArraySortFieldPipe,
    ArraySortLengthPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, materialModules],
  exports: [ToolbarComponent, DialogComponent, CardComponent, GridListComponent],
})
export class SharedModule {}
