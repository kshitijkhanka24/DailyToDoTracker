export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoStats {
  date: string;
  completionRate: number;
}