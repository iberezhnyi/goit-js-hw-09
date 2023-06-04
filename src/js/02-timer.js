import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputEl: document.getElementById('datetime-picker'),
  btnStartEl: document.querySelector('button[data-start]'),
  daysSpanEl: document.querySelector('span[data-days]'),
  hoursSpanEl: document.querySelector('span[data-hours]'),
  minutesSpanEl: document.querySelector('span[data-minutes]'),
  secondsSpanEl: document.querySelector('span[data-seconds]'),
};

refs.btnStartEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future!');
      return;
    }
    refs.btnStartEl.disabled = false;
  },
};

flatpickr(refs.inputEl, options);

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
    this.isActive = false;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    Notify.info('The countdown has started!');

    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      const targetTime = new Date(refs.inputEl.value);
      const deltaTime = targetTime - currentTime;
      const time = this.convertMs(deltaTime);
      this.onTick(time);
      console.log(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    refs.btnStartEl.disabled = true;
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.daysSpanEl.textContent = days;
  refs.hoursSpanEl.textContent = hours;
  refs.minutesSpanEl.textContent = minutes;
  refs.secondsSpanEl.textContent = seconds;
  if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
    timer.stop();
    Notify.success('The countdown is over!');
  }
}

const timer = new Timer({ onTick: updateTimerFace });

refs.btnStartEl.addEventListener('click', timer.start.bind(timer));

// ======================================================================================

// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';

// const refs = {
//   startBtn: document.querySelector('button[data-start]'),
//   input: document.querySelector('input[id="datetime-picker"]'),
//   spanDays: document.querySelector('span[data-days]'),
//   spanHours: document.querySelector('span[data-hours]'),
//   spanMinutes: document.querySelector('span[data-minutes]'),
//   spanSeconds: document.querySelector('span[data-seconds]'),
// };

// refs.startBtn.addEventListener('click', onStartClick);
// refs.startBtn.disabled = true;
// let userDate = null;

// const options = {
//   intervalID: null,
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,

//   onClose(selectedDates) {
//     userDate = selectedDates[0].getTime();

//     if (Date.now() > userDate) {
//       Notiflix.Notify.failure('Please choose a date in the future');
//       return;
//     }
//     refs.startBtn.disabled = false;
//   },
// };

// function onStartClick() {
//   const intervalID = setInterval(() => {
//     const currentTime = Date.now();
//     const deltaTime = userDate - currentTime;
//     updateTimerFace(deltaTime);

//     console.log(deltaTime);
//     if (deltaTime < 0) {
//       clearInterval(intervalID);
//       refs.startBtn.disabled = true;
//       updateTimerFace(0);
//     }
//   }, 1000);
// }

// flatpickr(refs.input, options);

// function updateTimerFace(deltaTime) {
//   refs.spanDays.textContent = convertMs(deltaTime).days;
//   refs.spanHours.textContent = convertMs(deltaTime).hours;
//   refs.spanMinutes.textContent = convertMs(deltaTime).minutes;
//   refs.spanSeconds.textContent = convertMs(deltaTime).seconds;
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = addLeadingZero(Math.floor(ms / day));
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }
