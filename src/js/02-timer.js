import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputPickerDate = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]'); //dobranie sie do przycisku start
let dataDays = document.querySelector('[data-days]'); //
let dataHours = document.querySelector('[data-hours]');
let dataMinutes = document.querySelector('[data-minutes]');
let dataSeconds = document.querySelector('[data-seconds]');
const actualDate = new Date(); //zmienna z akualna data

const options = {
  enableTime: true, //Pokazuje czas do wyboru. Domyslnie jest false- nie ma czasu.
  time_24hr: true, //Pokazuje czas w trybie 24h bez wyboru AM/PM, gdy jest włączony
  defaultDate: new Date(), //Domyślne ustawienie daty: aktualna
  minuteIncrement: 1, //Wprowadzenie minut. Dokładność do 1min. Domyślnie jest 5. (w tym przewijanie)
  onClose(selectedDates) {
    //po zamknięciu kalendarza wybrana data jest "uruchomiona/wybrana"
    // console.log(selectedDates[0]);
    if (selectedDates[0] < actualDate) {
      //jeśli wybrana data przez uzytkownika jest z przeszlosci (dalasza niz aktualna)...
      Notiflix.Notify.warning('Please choose a date in the future'); //...komunikat "proszę wybrać datę z przyszłości"
      buttonStart.disabled = true; //... przycisk startowy jest nieaktywny
    } else if (selectedDates[0] > actualDate) {
      //jeśli wybrana data przez uzytkownika jest z przyszlosci...
      Notiflix.Notify.success('OK'); //... komunikat "OK"
      buttonStart.disabled = false; //... przycisk startowy jest aktywny
    }
  },
};
const datePicker = flatpickr(inputPickerDate, options); //pokazanie sie kalendarza

function addLeadingZero(value) {
  //utworzenie funkcji zero wiodące
  return String(value).padStart(2, '0'); // zwraca wartość zamienioną na string i dodaje metodę padStart. 2-bo chce mieć dwucyfrową liczbę, '0' bo chcę by przed stringiem było 0. padEnd działa tak samo, tylko dodaje po stringu.
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

buttonStart.addEventListener('click', () => {
  //dodanie eventu na przycisk startowy-click

  let counter = setInterval(() => {
    //zmienna, która odlicza, ustawienie interwalu
    let currentTime = new Date().getTime(); //obecna data
    let msCount = datePicker.selectedDates[0].getTime() - currentTime; //ilość czasu w ms=róznica czasu pomiędzy aktualnym czasem a wybraną datą uzytkownika w KALENDARZU.
    let timer = convertMs(msCount); //zmiana z ms

    dataDays.textContent = addLeadingZero(timer.days); //dobranie sie do tekstu w dataDays
    dataHours.textContent = addLeadingZero(timer.hours); //dobranie sie do tekstu w dataHours
    dataMinutes.textContent = addLeadingZero(timer.minutes); //dobranie sie do tekstu w dataMinutes
    dataSeconds.textContent = addLeadingZero(timer.seconds); //dobranie sie do tekstu w dataSeconds

    if (msCount < 1000) {
      //jesli czas odliczany jest mniejszy niz 1 sek to funkcja sie zatrzymuje
      clearInterval(counter);
    }
  }, 1000); //interwal co 1 sek.
});
