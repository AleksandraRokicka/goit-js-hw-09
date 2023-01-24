import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputPickerDate = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
let dataDays = document.querySelector('[data-days]');
let dataHours = document.querySelector('[data-hours]');
let dataMinutes = document.querySelector('[data-minutes]');
let dataSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true, //Włącza selektor czasu//
  time_24hr: true, //Wyświetla selektor czasu w trybie 24-godzinnym bez wyboru AM/PM, gdy jest włączony.//
  defaultDate: new Date(), //Ustawia początkowe wybrane daty.//
  minuteIncrement: 1, //Dostosowuje krok do wprowadzania minut (w tym przewijanie)//
  onClose(selectedDates) {
    //Funkcje uruchamiane przy każdym zamknięciu kalendarza.//

    if (selectedDates[0] > options.defaultDate) {
      buttonStart.removeAttribute('disabled');
    } else {
      buttonStart.setAttribute('disabled', '');
      Notiflix.Notify.info('Please choose a date in the future');
    }
  },
};
