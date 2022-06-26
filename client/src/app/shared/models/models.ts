export interface Projects {
  id: number;
  title: string;
  todos: Todos[];
}

export interface Todos {
  id: number;
  title: string;
  isCompleted: boolean;
}

export class Todo {
  project: string;
  title: string;
}

export type Project = Pick<Projects, 'title'>;
