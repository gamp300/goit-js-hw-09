import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function startTimer() {
  document.querySelector('[data-start]').disabled = true;
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      handleDateSelection(selectedDates[0]);
      document.querySelector('[data-start]').disabled = false;
    },
  };

  flatpickr('#datetime-picker', options);
}

function handleDateSelection(selectedDate) {
  const now = new Date();

  if (selectedDate <= now) {
    Notiflix.Notify.failure('Elija una fecha en el futuro.');
    document.querySelector('[data-start]').disabled = true;
  } else {
    document.querySelector('[data-start]').disabled = false;
  }
}

function startCountdown(endDate) {
  const timerInterval = setInterval(updateTimer, 1000, endDate);

  updateTimer(endDate);

  function updateTimer(endDate) {
    const now = new Date();
    const timeDifference = endDate - now;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      Notiflix.Notify.success('¡Se completó el tiempo!');
      document.querySelector('[data-start]').disabled = false;
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      document.querySelector('[data-days]').textContent = formatTimeUnit(days);
      document.querySelector('[data-hours]').textContent =
        formatTimeUnit(hours);
      document.querySelector('[data-minutes]').textContent =
        formatTimeUnit(minutes);
      document.querySelector('[data-seconds]').textContent =
        formatTimeUnit(seconds);
    }
  }

  function formatTimeUnit(unit) {
    return unit < 10 ? '0' + unit : unit;
  }
}

document.querySelector('[data-start]').addEventListener('click', function () {
  const selectedDate = flatpickr('#datetime-picker').selectedDates[0];
  handleDateSelection(selectedDate);
  if (!document.querySelector('[data-start]').disabled) {
    startCountdown(selectedDate);
    document.querySelector('[data-start]').disabled = true;
  }
});

document.addEventListener('DOMContentLoaded', startTimer);
