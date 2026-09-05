let toastTimer = null;

export function showToast(message, type = "success") {
  const toastContainer = document.querySelector(".toast-container");

  if (!toastContainer) {
    return;
  }

  let toast = toastContainer.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toastContainer.appendChild(toast);
  }

  toast.className = `toast ${type} show`;
  toast.textContent = message;

  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
    toast.remove();
    toastTimer = null;
  }, 3000);
}
