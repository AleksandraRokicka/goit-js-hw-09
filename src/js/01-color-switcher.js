// const buttonStart = document.querySelector('[data-start]');
// const buttonStop = document.querySelector('[data-stop]');
// const body = document.querySelector('body');
// let timerId = null;

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

// buttonStart.addEventListener('click', () => {
//   timerId = setInterval(() => {
//     body.style.backgroundColor = getRandomHexColor();
//     const buttonStart = document.querySelector('[data-start]').disabled = true;
//   }, 1000);
// });

// buttonStop.addEventListener('click', () => {
//     clearInterval(timerId);
//     const buttonStart = (document.querySelector('[data-start]').disabled = false);
// });


import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

Notiflix.Notify.init({
  info: { background: 'hsla(360, 96%, 64%, 0.71)' },
});

const inputDate = document.querySelector('input#datetime-picker');
const btnBeginCount = document.querySelector('button[data-start]');
let daysCount = document.querySelector('[data-days]');
let hoursCount = document.querySelector('[data-hours]');
let minutesCount = document.querySelector('[data-minutes]');
let secondsCount = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  weekNumbers: true,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);

    if (selectedDates[0] > options.defaultDate) {
      btnBeginCount.removeAttribute('disabled');
    } else {
      btnBeginCount.setAttribute('disabled', '');
      Notiflix.Notify.info('Please choose a date in the future');
    }
  },
};

const datePicker = flatpickr(inputDate, options);

btnBeginCount.setAttribute('disabled', '');

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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

btnBeginCount.addEventListener('click', () => {
  btnBeginCount.setAttribute('disabled', '');
  let interval = setInterval(() => {
    let currentTime = new Date().getTime();
    let msToCount = datePicker.selectedDates[0].getTime() - currentTime;
    // console.log(msToCount);
    let timer = convertMs(msToCount);

    daysCount.textContent = addLeadingZero(timer.days);
    hoursCount.textContent = addLeadingZero(timer.hours);
    minutesCount.textContent = addLeadingZero(timer.minutes);
    secondsCount.textContent = addLeadingZero(timer.seconds);

    if (msToCount < 1000) {
      clearInterval(interval);
    }
  }, 1000);
});

