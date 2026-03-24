import type { Task } from "./interfaces";

export function getTodosFromLocalStorage() {
  const todos = localStorage.getItem("todos");
  if (todos === null) {
    return [] as Task[];
  } else {
    return JSON.parse(todos) as Task[];
  }
}

export function saveTodoToLocalStorage(todo: Task) {
  const todos = localStorage.getItem("todos");
  if (todos === null) {
    const allTodos: Task[] = [];
    allTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(allTodos));
  } else {
    const localTodos = JSON.parse(todos) as Task[];
    localTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(localTodos));
  }
}

export function overWriteTodos(todos: Task[]) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
export function deleteById(id: string) {
  console.log(id);

  const actualId = id.replace("del-", "");
  console.log(`Deleting ${actualId}`);
  let todos = getTodosFromLocalStorage();
  todos = todos.filter((t) => t.id !== actualId);
  overWriteTodos(todos);
}

export function markAsComplete(id: string) {
  console.log(`Marking as completed ${id}`);
  const actualId = id.replace("done-", "");
  // TODO mark a task as completed by changing the done flag to true
  const todos = getTodosFromLocalStorage();
  const target = todos.find((e) => e.id === actualId);
  if (target) {
    target.done = !target.done;
    console.log(`Done: ${target.done}`);
  }
  overWriteTodos(todos);
}
