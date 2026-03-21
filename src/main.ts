import type { Task } from "./storage/interfaces";
import {
  getTodosFromLocalStorage,
  saveTodoToLocalStorage,
} from "./storage/methods";
import "./style.css";

updateTodos();

const createTodo_tag = document.getElementsByClassName(
  "hidder",
)[0] as HTMLDivElement;
const triggerCreateTodo_button = document.getElementById(
  "triggerCreateTodo_button",
) as HTMLButtonElement;
const createTodo_button = document.getElementById(
  "createTodo_button",
) as HTMLButtonElement;

// Buttons configs
if (triggerCreateTodo_button) {
  triggerCreateTodo_button.addEventListener("click", () => {
    console.log(`triggered creation process`);
    if (createTodo_tag) {
      console.log(`Toggling`);
      createTodo_tag.classList.toggle("hidden");
    }
  });
}
if (createTodo_button) {
  createTodo_button.addEventListener("click", () => {
    // Stuff to get and after clean
    const title = document.getElementById(
      "todoName_textarea",
    ) as HTMLTextAreaElement;
    const description = document.getElementById(
      "todoDetail_textarea",
    ) as HTMLTextAreaElement;
    const todoId = crypto.randomUUID();

    const newTodo: Task = {
      id: todoId,
      done: false,
      title: title.value,
      description: description.value,
    };
    saveTodoToLocalStorage(newTodo);
    createTodo_tag.classList.toggle("hidden");
    title.value = "";
    description.value = "";
    updateTodos();
  });
}

function updateTodos() {
  const todos = getTodosFromLocalStorage();
  const todoer_tag = document.getElementById("todoer");
  if (todoer_tag) {
    todoer_tag.innerHTML = "";
    todos.forEach((todo) => {
      console.log(todo);
      const todo_space = document.createElement("div");
      todo_space.innerHTML = `
    <div id="${todo.id}" class='todoDisplay'>
          <h2>${todo.title}</h2>
          <p>${todo.description}</p>
        </div>
    `;
      todoer_tag.appendChild(todo_space);
    });
  }
}
