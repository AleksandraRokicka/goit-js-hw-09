import Notiflix from 'notiflix';

const form = document.querySelector('form'); //dobranie sie do formularza//
const inputFirstDelay = document.querySelector('input[name="delay"]'); //dobranie sie do inputa 1-opoznienie pierwsze//
const delayStep = document.querySelector('input[name="step"]'); //dobranie sie do inputa 2-opoznienie//
const amount = document.querySelector('input[name="amount"]'); //dobranie sie do inputa 3-ilosc//

function createPromise(position, delay) {
  //stworzenie funkcji z argumentami: pozycja(liczba) i opóźnienie
  return new Promise((resolve, reject) => {
    //zwraca nowy promise (rozwiązany, odrzucony)
    setTimeout(() => {
      //opoznienie czasowe po jakim funkcja sie wykonuje
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        //jeśli warunek shouldResolve zostal spelniony, czyli jesli komp wylosuje liczbe wieksza od 0.3 i miejsza od 1...
        // Fulfill//
        resolve({ position, delay }); //...to promise jest rozwiązany i zwraca nam pozycję i opoznienie
      } else {
        // Reject//
        reject({ position, delay }); //...w przeciwnym razie jest odrzucony i tez zwraca nam pozycje i opoznienie
      }
    }, delay); //wartosc opoznienia z setTimeout
  });
}

form.addEventListener('submit', e => {
  // dodajemy listener (submit) do formularza
  e.preventDefault(); //usuwamy domyslne dzialanie przegladarki

  let delay = parseInt(inputFirstDelay.value); //tworzmy zmienna, wartosc pierwszego inputu (opoznienie) parsujemy tekst na liczbe calkowita
  for (let i = 1; i <= amount.value; i++) {
    //pętla, ilość promisów i dodawanie po 1
    createPromise(i, delay) //odwolanie do funkcji createPromise,
      .then(({ position, delay }) => {
        // then obsługuje pomyslne wykonanie promise. Normalnie byłby console.log(`✅ Fulfilled promise ${position} in ${delay}ms`); ale korzystamy z biblioteki i jest tak:
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      }) //ukazuje nam sie komunikat "✅ Fulfilled promise (POZYCJA) in (OPOZNIENIE)"

      .catch(({ position, delay }) => {
        // catch obsługuje wyłapywanie blędów
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      }); //jw, Normalnie byłby console.log(`❌ Rejected promise ${position} in ${delay}ms`);

    delay += parseInt(delayStep.value); //całkowite opoznienie=opoznienie+wartość drugiego opoznienia
    //delay=delay+parseInt(delayStep.value);
  }
});
