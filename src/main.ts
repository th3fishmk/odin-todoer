import type { Task } from "./storage/interfaces";
import {
  deleteById,
  getTodosFromLocalStorage,
  markAsComplete,
  saveTodoToLocalStorage,
} from "./storage/methods";
import "./style.css";

updateTodos();

const triggerCreateTodo_button = document.getElementById(
  "triggerCreateTodo_button",
) as HTMLButtonElement;
const createTodo_button = document.getElementById(
  "createTodo_button",
) as HTMLButtonElement;

// UI for todo creation/edit
if (triggerCreateTodo_button) {
  triggerCreateTodo_button.addEventListener("click", () => {
    showTodoCreator(undefined);
  });
}
function showTodoCreator(task: Task | undefined) {
  // Todo: Confirm to discard current buffer, in case it already exist
  const noteEditor = document.getElementById("note-editor");
  const editorDiv = todoCreator(task);
  if (noteEditor) {
    if (noteEditor.classList.contains("adding")) {
      noteEditor.classList.toggle("hidden");
    } else {
      noteEditor.classList.add("adding");
      noteEditor.appendChild(editorDiv);
    }
  }
}

// Actual todo creation/save
if (createTodo_button) {
  createTodo_button.addEventListener("click", () => {
    const todoCreator = document.getElementById("todo-creator");
    if (todoCreator) {
      console.log(todoCreator);
    }
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

      const editButton = document.createElement("button");
      editButton.id = `edit-${todo.id}`;
      editButton.innerHTML = "📝";
      editButton.addEventListener("click", (e) => {
        console.log(e);
        showTodoCreator(todo);
      });

      // Add all the buttons to the actions div
      actions.appendChild(editButton);
      actions.appendChild(completeButton);
      actions.appendChild(deleteButton);
      todo_space.appendChild(actions);
      todoer_tag.appendChild(todo_space);
    });
  }
}

function todoCreator(todo: Task | undefined) {
  const mainDiv = document.createElement("div");
  mainDiv.id = "todo-creator";

  const titleArea = document.createElement("textarea");
  titleArea.placeholder = "Give your todo a name";
  titleArea.id = "todoName_textarea";
  titleArea.classList.add("todos");
  titleArea.maxLength = 120;
  titleArea.value = todo ? todo.title : "";
  titleArea.classList.add("removeOutline");

  const descriptionArea = document.createElement("textarea");
  descriptionArea.placeholder = "Add more details (optional)";
  descriptionArea.id = "todoDetail_textarea";
  descriptionArea.classList.add("todos");
  descriptionArea.value = todo ? todo.description : "";
  descriptionArea.classList.add("removeOutline");
  let id = "";
  if (todo === undefined) {
    id = crypto.randomUUID();
  } else {
    id = todo.id;
  }

  mainDiv.appendChild(titleArea);
  mainDiv.appendChild(descriptionArea);

  const actions = document.createElement("div");
  actions.classList.add("todoCreationActions");

  const createButton = document.createElement("button");
  createButton.addEventListener("click", () => {
    const newTodo: Task = {
      id: id,
      title: titleArea.value,
      description: descriptionArea.value,
      done: todo ? todo.done : false,
    };
    saveTodoToLocalStorage(newTodo);
    updateTodos();
    discardEditor();
  });
  createButton.textContent = "Create";
  actions.appendChild(createButton);

  mainDiv.appendChild(actions);
  return mainDiv;
}

function discardEditor() {
  const editor = document.getElementById("note-editor");
  if (editor) {
    editor.innerHTML = "";
    editor.classList.remove("adding");
  }
}
