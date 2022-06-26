import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  public getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['todos'],
    });
  }

  public async findProject(title: string): Promise<Project | undefined> {
    const project: Project | undefined = await this.projectRepository.findOne({
      select: ['id'],
      where: { title: title },
    });
    if (project) {
      return project;
    }
    const newProject = await this.createProject(title);
    return newProject;
  }

  async getOneById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOneBy({
      id: id,
    });
    return project;
  }

  async createProject(title: string): Promise<Project> {
    const project: Project = new Project();
    project.title = title;
    return this.projectRepository.save(project);
  }

  async removeProject(id: number): Promise<Project> {
    const project = await this.getOneById(id);
    return this.projectRepository.remove(project);
  }
}
