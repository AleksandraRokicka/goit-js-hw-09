import Notiflix from 'notiflix';

const form = document.querySelector('form'); //dobranie sie do formularza//
const inputFirstDelay = document.querySelector('input[name="delay"]'); //dobranie sie do inputa 1-opoznienie pierwsze//
const delayStep = document.querySelector('input[name="step"]'); //dobranie sie do inputa 2-opoznienie//
const amount = document.querySelector('input[name="amount"]'); //dobranie sie do inputa 3-ilosc//


function createPromise(position, delay) {
  return new Promise((resolve, reject) => { //zwraca nowy promise
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        // Fulfill//
        resolve({ position, delay });
      } else {
        // Reject//
        reject({ position, delay });
      }
    }, delay);
  });
}


form.addEventListener('submit', e => {
    e.preventDefault();

    let delay = parseInt(inputFirstDelay.value);
    for (let i = 1; i <= amount.value; i++) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })

  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  delay += parseInt(delayStep.value);
  }
});