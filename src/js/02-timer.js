import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const btnStart = document.querySelector('btn-timer');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;
let timeId = null;


// Notiflix.Notify.info('Please friend, choise data');



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    
    if (selectedDates[0] - date > 0) {
      btnStart.disabled = false;
    }
    else {
      btnStart.disabled = true;
      Notify.failure('Please choose a date in the future', {
        timeout: 1500,
        width: '400px',
      });
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function onTimeStart() {
  const selectedDate = fp.selectedDates[0];

  timeId = setInterval(() => {
    const startTime = new Date();
    const timer = selectedDate - startTime;
   
    btnStart.disabled = true;

    if (timer < 0) {
      clearInterval(timeId);
      return;
    }
    updateTimerDates(convertMs(timer));
  },1_000)
}

function updateTimerDates() {
  days.textContent = addLeadingZero(days);
  hours.textContent = addLeadingZero(hours);
  minutes.textContent = addLeadingZero(minutes);
  seconds.textContent = addLeadingZero(seconds);
}


const fp = flatpickr('#datetime-picker', options);


btnStart.addEventListener('click', onTimeStart);





