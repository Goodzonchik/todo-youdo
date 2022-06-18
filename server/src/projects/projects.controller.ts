import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Get()
  getIndex() {
    return this.projectsService.getIndex();
  }
}
