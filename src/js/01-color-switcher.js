const bodyRef = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);
stopBtn.disabled = true;

function onStartClick() {
  toggleActiveBtn();

  intervalId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  toggleActiveBtn();
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function toggleActiveBtn() {
  startBtn.disabled ? (stopBtn.disabled = true) : (stopBtn.disabled = false);
  stopBtn.disabled ? (startBtn.disabled = false) : (startBtn.disabled = true);
}
