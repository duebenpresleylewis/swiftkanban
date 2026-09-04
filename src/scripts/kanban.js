export function initialiseKanban() {
  const kanbanContainer = document.getElementById("kanban-container");
  const kanbanColumns = document.querySelectorAll(".kanban-column");

  if (!kanbanContainer || !kanbanColumns.length) {
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

  kanbanContainer.addEventListener("dragstart", (event) => {
    const taskItem = event.target.closest(".task-item");

    if (!taskItem) {
      return;
    }

    event.dataTransfer.setData("text/plain", taskItem.id);
    event.dataTransfer.effectAllowed = "move";
  });

  kanbanContainer.addEventListener("dragover", (event) => {
    if (event.target.closest(".kanban-column")) {
      event.preventDefault();
    }
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
