const buttons = document.querySelectorAll('.icon-button');
const display = document.getElementById('selected-message');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const message = button.dataset.message;
    display.textContent = message;
  });
});
