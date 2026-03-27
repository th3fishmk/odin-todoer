export interface Task {
    id: string;
    done: boolean;
    title: string;
    description: string;
    dueDate?: number;
    creationDate?: number;
    priority?: number;
}

export interface UserData {
    ID: string;
    name: string;
    projects: string[];
}
