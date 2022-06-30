export interface Project {
  id: number;
  title: string;
  todos: Todos[];
}

export interface Todos {
  id: number;
  title: string;
  isCompleted: boolean;
  project: {
    id: number;
    title: string;
  };
}

export class Todo {
  project: string;
  title: string;
}

export interface Category {
  index: number;
  value: string;
}
