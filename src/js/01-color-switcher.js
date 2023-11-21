const dataStart = document.querySelector(`[data-start]`);
const dataStop = document.querySelector(`[data-stop]`);
const body = document.body;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function colorChange() {
  body.style.background = getRandomHexColor();
}

let idInterval;

dataStart.addEventListener('click', function () {
  dataStart.disabled = true;
  dataStop.disabled = false;

  idInterval = setInterval(colorChange, 1000);
});

dataStop.addEventListener('click', function () {
  dataStart.disabled = false;
  dataStop.disabled = true;

  clearInterval(idInterval);
});
