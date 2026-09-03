export function initialiseKanban() {
  const kanbanContainer = document.getElementById("kanban-container");
  const todoColumn = document.getElementById("todo");
  const inProgressColumn = document.getElementById("in-progress");
  const doneColumn = document.getElementById("done");

    // Add event listeners for drag and drop functionality
    kanbanContainer.addEventListener("dragstart", (event) => {
