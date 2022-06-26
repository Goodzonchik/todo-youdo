import { Component, Input, OnChanges } from '@angular/core';
import { Projects } from '../../models/models';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss'],
})
export class GridListComponent {
  constructor() {}

  @Input() projects: Projects[];
}
