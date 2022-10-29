import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');
formEl.addEventListener('submit', onFormSubmit);

function getNumValues(e) {
  const amount = Number(e.currentTarget.elements.amount.value);
  const delayStep = Number(e.currentTarget.elements.step.value);
  let firstDelay = Number(e.currentTarget.elements.delay.value);

  return { amount: amount, delayStep: delayStep, firstDelay: firstDelay };
}

function onFormSubmit(e) {
  const { amount, delayStep } = getNumValues(e);
  let { firstDelay } = getNumValues(e);

  e.preventDefault();

  getPromise(amount, firstDelay, delayStep);
}

function getPromise(amount, firstDelay, delayStep) {
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay).then(onSuccess).catch(onError);

    firstDelay += delayStep;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) resolve({ position, delay });

      reject({ position, delay });
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
