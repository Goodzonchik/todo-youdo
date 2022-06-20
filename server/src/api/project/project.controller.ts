import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectController {
  @Inject(ProjectService)
  private readonly service: ProjectService;

  @Get()
  public getAllProjects(): Promise<Project[]> {
    return this.service.getAllProjects();
  }
}
