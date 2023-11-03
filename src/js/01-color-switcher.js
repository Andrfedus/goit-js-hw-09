function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}



const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyColor = document.body;

let timerId = null;

btnStart.addEventListener('click', startColors);
btnStop.addEventListener('click', stopColors);

function startColors(event) {
    btnStart.disabled = true;
    timerId = setInterval(() => {
    bodyColor.style.background = getRandomHexColor()
     }, 1000)
};

function stopColors() {
    btnStart.disabled = false;
    clearInterval(timerId);
   
}
