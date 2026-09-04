export function initialiseKanban() {
  const kanbanContainer = document.getElementById("kanban-container");
  const todoColumn = document.getElementById("todo");
  const inProgressColumn = document.getElementById("in-progress");
  const doneColumn = document.getElementById("done");

    // Add event listeners for drag and drop functionality
    kanbanContainer.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", event.target.id);
    });

    kanbanContainer.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    kanbanContainer.addEventListener("drop", (event) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData("text/plain");
        const taskElement = document.getElementById(taskId);
        const targetColumn = event.target.closest(".kanban-column");

        if (targetColumn && taskElement) {
            targetColumn.querySelector(".task-list").appendChild(taskElement);
        }
    });

    

}
