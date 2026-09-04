export function initialiseKanban() {
  const kanbanContainer = document.getElementById("kanban-container");
  const kanbanColumns = document.querySelectorAll(".kanban-column");
  const taskItems = document.querySelectorAll(".task-item");

  if (!kanbanContainer || !kanbanColumns.length || !taskItems.length) {
    return;
  }

  const moveTaskToColumn = (taskId, targetColumn) => {
    if (!taskId || !targetColumn) {
      return;
    }

    const taskElement = document.getElementById(taskId);
    const taskList = targetColumn.querySelector(".task-list");

    if (taskElement && taskList && taskList !== taskElement.parentElement) {
      taskList.appendChild(taskElement);
    }
  };

  taskItems.forEach((taskItem) => {
    taskItem.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", taskItem.id);
      event.dataTransfer.effectAllowed = "move";
    });

    taskItem.addEventListener("dragend", () => {
      kanbanColumns.forEach((column) => column.classList.remove("drag-over"));
    });
  });

  kanbanColumns.forEach((column) => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    column.addEventListener("dragenter", (event) => {
      event.preventDefault();
      column.classList.add("drag-over");
    });

    column.addEventListener("dragleave", (event) => {
      if (!column.contains(event.relatedTarget)) {
        column.classList.remove("drag-over");
      }
    });

    column.addEventListener("drop", (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text/plain");
      moveTaskToColumn(taskId, column);
      column.classList.remove("drag-over");
    });
  });

  kanbanContainer.addEventListener("drop", (event) => {
    event.preventDefault();
    const targetColumn = event.target.closest(".kanban-column");
    const taskId = event.dataTransfer.getData("text/plain");

    moveTaskToColumn(taskId, targetColumn);
    kanbanColumns.forEach((column) => column.classList.remove("drag-over"));
  });
}
