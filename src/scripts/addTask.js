export function initializeAddTaskButton() {
    const addTaskButton = document.getElementById("add-task-btn");
    addTaskButton.addEventListener("click", () => {
        const todoColumn = document.getElementById("todo-column");
        const childrenCount = todoColumn.children.length;
        if(childrenCount >= 10) {
            showToast("Maximum task limit reached!", "error");
            return;
        }
        const taskItem = document.createElement("li");
        taskItem.className = "task-item bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer";
        taskItem.setAttribute("draggable", "true");
        taskItem.textContent = "New Task";
        todoColumn.appendChild(taskItem);
        showToast("Task added!", "success");
    });
}