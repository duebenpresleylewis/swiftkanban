import { showToast } from "./toast.js";

export function initializeAddTaskButton() {
  const addTaskButton = document.getElementById("add-task-btn");
  const modalContainer = document.querySelector(".modal-container");
  const closeButton = document.getElementById("close-modal");
  const submitButton = document.getElementById("add-task-submit");
  const taskInput = document.getElementById("task-input");

  if (!addTaskButton || !modalContainer || !taskInput) {
    return;
  }

  const openModal = () => {
    modalContainer.style.display = "flex";
    taskInput.value = "";
    taskInput.focus();
  };

  const closeModal = () => {
    modalContainer.style.display = "none";
    taskInput.value = "";
  };

  addTaskButton.addEventListener("click", openModal);

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
      closeModal();
    }
  });

  const addTaskToTodo = () => {
    const todoColumn = document.getElementById("todo-column");
    const taskValue = taskInput.value.trim();

    if (!todoColumn) {
      showToast("To Do column not found.", "error");
      return;
    }

    if (!taskValue) {
      showToast("Please enter a task name.", "error");
      taskInput.focus();
      return;
    }

    if (todoColumn.children.length >= 10) {
      showToast("Maximum task limit reached!", "error");
      return;
    }

    const taskItem = document.createElement("li");
    taskItem.className =
      "task-item bg-amber-500 rounded-xl p-4 m-2 cursor-grab active:cursor-grabbing active:shadow-2xs active:scale-105 transition-all";
    taskItem.setAttribute("draggable", "true");
    taskItem.id = `task-${Date.now()}`;
    taskItem.textContent = taskValue;

    taskItem.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", taskItem.id);
      event.dataTransfer.effectAllowed = "move";
      taskItem.classList.add("dragging");
      document.body.style.cursor = "grabbing";
    });

    taskItem.addEventListener("dragend", () => {
      taskItem.classList.remove("dragging");
      document.body.style.cursor = "";
      document.querySelectorAll(".kanban-column").forEach((column) => {
        column.classList.remove("drag-over");
      });
    });

    todoColumn.appendChild(taskItem);
    closeModal();
    showToast("Task added!", "success");
  };

  if (submitButton) {
    submitButton.addEventListener("click", addTaskToTodo);
  }

  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTaskToTodo();
    }
  });
}
