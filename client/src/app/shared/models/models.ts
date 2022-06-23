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
