import type { Task } from "./storage/interfaces";
import {
  deleteById,
  getTodosFromLocalStorage,
  markAsComplete,
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
    // console.log(`triggered creation process`);
    if (createTodo_tag) {
      // console.log(`Toggling`);
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
      // console.log(todo);
      const todo_space = document.createElement("div");
      todo_space.classList.add("todoContainer");
      todo_space.innerHTML = `
        <div id="${todo.id}" class='todoDisplay'>
          <h2>${todo.title}</h2>
          <p>${todo.description}</p>
        </div>
    `;
      if (todo.done) {
        todo_space.classList.add("completed");
      }
      const actions = document.createElement("div");
      actions.classList.add("actions");

      // Buttons for the action div
      const deleteButton = document.createElement("button");
      deleteButton.id = `del-${todo.id}`;
      deleteButton.innerHTML = "🗑️";
      deleteButton.addEventListener("click", (d) => {
        const id = d.target as HTMLButtonElement;
        deleteById(id.id);
        updateTodos();
      });
      const completeButton = document.createElement("button");
      completeButton.id = `done-${todo.id}`;
      completeButton.innerHTML = todo.done === true ? "↩️" : "✅";
      completeButton.addEventListener("click", (e) => {
        const completed = e.target as HTMLButtonElement;
        markAsComplete(completed.id);
        updateTodos();
      });

      // Add all the buttons to the actions div
      actions.appendChild(completeButton);
      actions.appendChild(deleteButton);
      todo_space.appendChild(actions);
      todoer_tag.appendChild(todo_space);
    });
  }
}
