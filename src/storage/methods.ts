import type { Task } from "./interfaces";

export function getTodosFromLocalStorage() {
    const todos = localStorage.getItem('todos');
    if (todos === null) {
        return [] as Task[];
    }else {
        return JSON.parse(todos) as Task[];
    }
}

export function saveTodoToLocalStorage(todo:Task) {
    const todos = localStorage.getItem('todos');
    if (todos === null) {
        const allTodos:Task[] = [];
        allTodos.push(todo);
        localStorage.setItem('todos',JSON.stringify(allTodos));
    }
    else {
        const localTodos = JSON.parse(todos) as Task[];
        localTodos.push(todo);
        localStorage.setItem('todos',JSON.stringify(localTodos));
    }
}