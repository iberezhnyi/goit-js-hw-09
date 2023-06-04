import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');
formEl.addEventListener('submit', onFormSubmit);

function getNumValues(e) {
  const amount = Number(e.currentTarget.elements.amount.value);
  const delayStep = Number(e.currentTarget.elements.step.value);
  let firstDelay = Number(e.currentTarget.elements.delay.value);

  console.log(e.currentTarget.elements);

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

// =================================================================

// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const formRef = document.querySelector('.form');

// formRef.addEventListener('submit', onFormSubmit);

// function onFormSubmit(evt) {
//   evt.preventDefault();

//   const firstDelay = Number(evt.target.delay.value);
//   const delayStep = Number(evt.target.step.value);
//   const amount = Number(evt.target.amount.value);

//   setTimeout(() => {
//     let totalDelay = firstDelay;
//     for (let i = 1; i <= amount; i += 1) {
//       createPromise(i, totalDelay)
//         .then(({ position, delay }) => {
//           Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//         })
//         .catch(({ position, delay }) => {
//           Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//         });
//       totalDelay += delayStep;
//     }
//   }, firstDelay);
// }

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;

//   return (promise = new Promise((resolve, reject) => {
//     setInterval(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   }));
// }
