import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss'],
})
export class GridListComponent implements OnInit {
  constructor(private _api: ApiService) {}

  projects$: Observable<Project[]>;

  ngOnInit() {
    this._api.getProjects();
    this.projects$ = this._api.projects$;
  }
}
