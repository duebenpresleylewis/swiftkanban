export function initialiseKanban() {
  const kanbanContainer = document.getElementById("kanban-container");
  const taskItems = document.querySelectorAll(".task-item");
  const kanbanColumns = document.querySelectorAll(".kanban-column");

  if (!kanbanContainer || !kanbanColumns.length || !taskItems.length) {
    return;
  }

  for(const taskItem of taskItems) {
    taskItem.addEventListener("dragstart", dragStartHandler);
    taskItem.addEventListener("dragend", dragEndHandler);
  }

  for(const column of kanbanColumns) {
    column.addEventListener("dragover", dragOverHandler);
    column.addEventListener("dragenter", dragEnterHandler);
    column.addEventListener("dragleave", dragLeaveHandler);
    column.addEventListener("drop", dropHandler);
  }

  function dragStartHandler(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dataTransfer.effectAllowed = "move";
    event.target.classList.add("dragging");
    document.body.style.cursor = "grabbing";
  }

  function dragEndHandler(event) {
    event.target.classList.remove("dragging");
    document.body.style.cursor = "";
    kanbanColumns.forEach((column) => column.classList.remove("drag-over"));
  }

  function dragOverHandler(event) {
    event.preventDefault();
  }

  function dragEnterHandler(event) {
    event.preventDefault();
    event.target.classList.add("drag-over");
  }

  function dragLeaveHandler(event) {
    if (!event.target.contains(event.relatedTarget)) {
      event.target.classList.remove("drag-over");
    }
  }

  function dropHandler(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    const taskItem = document.getElementById(taskId);
    if (taskItem && event.target.classList.contains("kanban-column")) {
      event.target.appendChild(taskItem);
    }
    event.target.classList.remove("drag-over");
  }
}
