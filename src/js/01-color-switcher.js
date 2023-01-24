const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    const buttonStart = (document.querySelector(
      '[data-start]'
    ).disabled = true);
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  const buttonStart = (document.querySelector('[data-start]').disabled = false);
});
