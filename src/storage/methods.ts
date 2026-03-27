import type { Task, UserData } from './interfaces';

export function getTodosFromLocalStorage() {
    const todos = localStorage.getItem('todos');
    if (todos === null) {
        return [] as Task[];
    } else {
        return JSON.parse(todos) as Task[];
    }
}

export function saveTodoToLocalStorage(todo: Task) {
    const todos = localStorage.getItem('todos');
    if (todos === null) {
        const allTodos: Task[] = [];
        allTodos.push(todo);
        localStorage.setItem('todos', JSON.stringify(allTodos));
    } else {
        // Check if the todo already exist
        const localTodos = JSON.parse(todos) as Task[];
        const duplicate = localTodos.findIndex((e) => e.id === todo.id);
        if (duplicate >= 0) {
            localTodos[duplicate] = todo;
        } else {
            localTodos.push(todo);
        }
        localStorage.setItem('todos', JSON.stringify(localTodos));
    }
}

export function overWriteTodos(todos: Task[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
}
export function deleteById(id: string) {
    const actualId = id.replace('del-', '');
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((t) => t.id !== actualId);
    overWriteTodos(todos);
}

export function markAsComplete(id: string) {
    const actualId = id.replace('done-', '');
    const todos = getTodosFromLocalStorage();
    const target = todos.find((e) => e.id === actualId);
    if (target) {
        target.done = !target.done;
    }
    overWriteTodos(todos);
}

export function getUserData(): UserData {
    console.log(`Reading user data`);

    const defaultUser: UserData = {
        ID: 'anonymous',
        name: 'anonymous',
        projects: [],
    };

    const userdataString = localStorage.getItem('userData');

    const userData: UserData =
        userdataString === null ? defaultUser : JSON.parse(userdataString);

    return userData;
}
