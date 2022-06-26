import { Component, OnInit } from '@angular/core';
import { apiService } from './services/api.service';
import { Projects } from './shared/models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  projects: Projects[];

  constructor(private _api: apiService) {}

  ngOnInit() {
    this.getProjects();
    this._api.Refreshrequired.subscribe((response) => this.getProjects());
  }

  getProjects() {
    this._api.getProjects().subscribe((response) => {
      this.projects = response;
    });
  }
}
