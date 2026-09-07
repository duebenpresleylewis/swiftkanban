import { showToast } from "./toast.js";

function ensureTaskIdentity(taskItem) {
  if (!taskItem.dataset.taskId) {
    taskItem.dataset.taskId = `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  if (!taskItem.id) {
    taskItem.id = taskItem.dataset.taskId;
  }
}

export function initialiseKanban() {
  const kanbanContainer = document.getElementById("kanban-container");
  const taskItems = document.querySelectorAll(".task-item");
  const kanbanColumns = document.querySelectorAll(".kanban-column");

  if (!kanbanContainer || !kanbanColumns.length) {
    return;
  }

  if (!taskItems.length) {
    console.warn(
      "No task items found yet. Drag-and-drop listeners are ready for items added later.",
    );
  }

  for (const taskItem of taskItems) {
    ensureTaskIdentity(taskItem);
    taskItem.addEventListener("dragstart", dragStartHandler);
    taskItem.addEventListener("dragend", dragEndHandler);
  }

  for (const column of kanbanColumns) {
    column.addEventListener("dragover", dragOverHandler);
    column.addEventListener("dragenter", dragEnterHandler);
    column.addEventListener("dragleave", dragLeaveHandler);
    column.addEventListener("drop", dropHandler);
  }

  function dragStartHandler(event) {
    const taskItem = event.currentTarget;
    ensureTaskIdentity(taskItem);

    event.dataTransfer.setData("text/plain", taskItem.dataset.taskId);
    event.dataTransfer.effectAllowed = "move";
    taskItem.classList.add("dragging");
    document.body.style.cursor = "grabbing";
  }

  function dragEndHandler(event) {
    const taskItem = event.currentTarget;
    taskItem.classList.remove("dragging");
    document.body.style.cursor = "";
    kanbanColumns.forEach((column) => column.classList.remove("drag-over"));
  }

  function dragOverHandler(event) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }

  function dragEnterHandler(event) {
    event.preventDefault();
    event.currentTarget.classList.add("drag-over");
  }

  function dragLeaveHandler(event) {
    const column = event.currentTarget;
    if (event.relatedTarget && column.contains(event.relatedTarget)) {
      return;
    }
    column.classList.remove("drag-over");
  }

  function dropHandler(event) {
    event.preventDefault();

    const column = event.currentTarget;
    const taskId = event.dataTransfer.getData("text/plain");
    const taskItem =
      document.querySelector(`[data-task-id="${CSS.escape(taskId)}"]`) ||
      document.getElementById(taskId);

    if (!taskItem) {
      column.classList.remove("drag-over");
      return;
    }

    column.appendChild(taskItem);

    if (column.dataset.column === "done" || column.id === "done-column") {
      const taskName = taskItem.textContent.trim() || "this task";
      const shouldDelete = window.confirm(`Delete "${taskName}"?`);

      if (shouldDelete) {
        taskItem.remove();
        showToast("Task deleted.", "success");
      } else {
        showToast("Task kept in Done.", "success");
      }
    } else {
      showToast("Task moved!", "success");
    }

    column.classList.remove("drag-over");
  }
}
