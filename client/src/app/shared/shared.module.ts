import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CardComponent } from './components/card/card.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { ArraySortLengthPipe } from './pipes/sort-by-length.pipe';
import { ArraySortFieldPipe } from './pipes/sort-by-field.pipe';

@NgModule({
  declarations: [
    ToolbarComponent,
    DialogComponent,
    CardComponent,
    GridListComponent,
    ArraySortFieldPipe,
    ArraySortLengthPipe,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [
    ToolbarComponent,
    DialogComponent,
    CardComponent,
    GridListComponent,
  ],
})
export class SharedModule {}
