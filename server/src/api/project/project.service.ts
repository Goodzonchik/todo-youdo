import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly repository: Repository<Project>;

  public getAllProjects(): Promise<Project[]> {
    return this.repository.find({
      relations: ['todos'],
    });
  }
  async createProject(title: string): Promise<Project> {
    const project: Project = new Project();
    project.title = title;
    return this.repository.save(project);
  }

  public async findProject(title: string): Promise<Project | undefined> {
    const project: Project | undefined = await this.repository.findOne({
      select: ['id'],
      where: { title: title },
    });
    if (project) {
      return project;
    }
    const newProject = await this.createProject(title);
    return newProject;
  }
}
