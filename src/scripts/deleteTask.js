export function initializeDeleteTaskButtons() {
  function deleteTask(taskItem) {
    const deleteButton = document.querySelector(".delete-task-button");

    deleteButton.addEventListener("click", (event) => {
      const taskItem = event.target.closest(".task-item");
      if (taskItem) {
        taskItem.remove();
      }
    });
  }
}
