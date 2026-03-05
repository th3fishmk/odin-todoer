interface Task {
  id: string;
  title: string;
  done: boolean;
  description?: string;
  dueDate?: number; // Dates are saved in unix timestamp
  creationDate?: number;
  priority?: number;
  steps?: Step[];
}

interface Step {
  description: string;
  done: boolean;
}

export function CreateTask(Title: string): Task {
  const todo: Task = {
    id: crypto.randomUUID(),
    title: Title,
    done: false,
  };
  return todo;
}

export function PrintTask(task: Task) {
  console.log(
    `The task: "${task.title}" with id ${task.id} is done: ${task.done} `,
  );
}

export function GetTasks(): Task[] {
  const stringTasks = localStorage.getItem("todos");
  const tasks: Task[] = [];

  if (stringTasks === null) {
    return tasks;
  } else {
    return JSON.parse(stringTasks);
  }
}
