export function showToast(message, type = 'success') {
  const toastContainer = document.querySelector('.toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type} show`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('show');
    toast.remove();
  }, 3000);
}