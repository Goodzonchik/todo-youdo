export interface Project {
  id: number;
  title: string;
  todos: Todo[];
}

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  project: ProjectLink;
}

export interface ProjectBody {
  title: string;
  todos: Todo[];
}

export interface TodoBody {
  projectId: number;
  title: string;
}

export interface Category {
  id: number | string;
  title: string;
}

type ProjectLink = Omit<Project, 'todos'>;
