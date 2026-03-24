export interface Task {
  id: string;
  done: boolean;
  title: string;
  description?: string;
  dueDate?: number; // Dates are saved in unix timestamp
  creationDate?: number;
  priority?: number;
}
