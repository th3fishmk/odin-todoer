export interface Task {
  id: string;
  title: string;
  done: boolean;
  description?: string;
  dueDate?: number; // Dates are saved in unix timestamp
  creationDate?: number;
  priority?: number;
  steps?: Step[];
  project?: string;
}

export interface Step {
  description: string;
  done: boolean;
}

export interface Projects {
  all: string[];
}
