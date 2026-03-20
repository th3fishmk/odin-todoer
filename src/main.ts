import type { Task } from "./storage/interfaces";
import "./style.css";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.ts";
// import typescriptLogo from "./typescript.svg";

const app_tag = document.querySelector<HTMLDivElement>("#app");

if (app_tag) {
  // 	app_tag.innerHTML = `
  //   <div>
  //     <a href="https://vite.dev" target="_blank">
  //       <img src="${viteLogo}" class="logo" alt="Vite logo" />
  //     </a>
  //     <a href="https://www.typescriptlang.org/" target="_blank">
  //       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
  //     </a>
  //     <h1>Vite + TypeScript</h1>
  //     <div class="card">
  //       <button id="counter" type="button"></button>
  //     </div>
  //     <p class="read-the-docs">
  //       Click on the Vite and TypeScript logos to learn more
  //     </p>
  //   </div>
  // `;
}

const newTodoButton = document.getElementById(
  "newTodoButton",
) as HTMLButtonElement;
const createTodoButton = document.getElementById(
  "todo-create-buttn",
) as HTMLButtonElement;

if (newTodoButton) {
  newTodoButton.addEventListener("click", () => {
    console.log("Clicked!");
  });
}

if (createTodoButton) {
  createTodoButton.addEventListener("click", () => {
    console.log("Creating new todo");


    const title = document.getElementById('todo-name') as HTMLTextAreaElement;
    const description = document.getElementById('todo-detail') as HTMLTextAreaElement;
    const todoId = crypto.randomUUID();

    if (title) {
      console.log(`title is: ${title.value}`);
    }
    if (description) {
      console.log(`TODO description: ${description.value}`);
    }

    const newTodo:Task = {
      id: todoId,
      done: false,
      title: title.value,
      description: description.value
    }

    console.log(newTodo);
    
  });
}
