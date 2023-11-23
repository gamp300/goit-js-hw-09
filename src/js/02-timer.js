import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate > new Date()) {
      startButton.removeAttribute('disabled');
    } else {
      startButton.setAttribute('disabled', 'true');
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(datetimePicker, options);

let intervalId;

function startCountdown() {
  const endDate = new Date(datetimePicker.value).getTime();

  intervalId = setInterval(() => {
    const currentDate = new Date().getTime();
    const timeDifference = endDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      updateTimer(0, 0, 0, 0);
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateTimer(days, hours, minutes, seconds);
    }
  }, 1000);
}

function updateTimer(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);

  document.querySelector('[data-start]').disabled = true;
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', startCountdown);
