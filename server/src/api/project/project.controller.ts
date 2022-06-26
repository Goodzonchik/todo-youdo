import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
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

  @Delete(':id')
  public removeProject(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Project> {
    return this.service.removeProject(id);
  }
}
