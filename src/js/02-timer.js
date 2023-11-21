import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Elija una fecha en el futuro');
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

let idInterval;
let dateEnd;
let selectedDate;

function startTimer() {
  // // dateEnd = flatpickr.parseDate(
  //   document.querySelector('#datetime-picker').value
  // );
  const defauDate = new Date();
  dateEnd = selectedDate.getTime() - defauDate.getTime();
  const transMs = convertMs(dateEnd);

  console.log(transMs);
  idInterval = setInterval(updateTimer, 1000);

  document.querySelector('[data-start]').disabled = true;
}

// function updateTimer() {
//   const now = new Date();
//   const timeDifference = dateEnd - now;

//   if (timeDifference <= 0) {
//     clearInterval(idInterval);
//     Notiflix.Notify.success('Se completo el tiempo!');
//   } else {
//     const { days, hours, minutes, seconds } = convertMs(timeDifference);
//     renderTimer({ days, hours, minutes, seconds });
//   }
// }

function convertMs(ms) {
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeading(value) {
  return value.toString().padStart(2, '0');
}

function renderTimer({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeading(days);
  document.querySelector('[data-hours]').textContent = addLeading(hours);
  document.querySelector('[data-minutes]').textContent = addLeading(minutes);
  document.querySelector('[data-seconds]').textContent = addLeading(seconds);
}
document.querySelector('[data-start]').addEventListener('click', startTimer);
