import '../css/styles.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit (e) {
  e.preventDefault();

  let delay = Number(formEl.delay.value);
  let step = Number(formEl.step.value);
  let amount = Number(formEl.amount.value);
  
  if (delay < 0 || step < 0 || amount <= 0) {
    Notify.warning('The values of the input fields must be positive', {clickToClose: true, width: '350px', timeout: 5000,});
    return;
   }
  
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {useIcon: false, width: '240px', timeout: 7000,});
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {useIcon: false, width: '240px', timeout: 7000,});
    });

    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {      
      if (shouldResolve) {
        resolve({position: position, delay: delay});
      } else {
        reject({position: position, delay: delay});
      }
    }, delay);
  });
}