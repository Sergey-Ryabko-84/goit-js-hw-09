import '../css/styles.css'
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('.value[data-days]'),
  hoursEl: document.querySelector('.value[data-hours]'),
  minutesEl: document.querySelector('.value[data-minutes]'),
  secondsEl: document.querySelector('.value[data-seconds]'),
  endDate: null,
  timerId: null,
}

refs.startBtn.disabled = true;
refs.startBtn.insertAdjacentHTML('afterend', ' <button type="button" data-stop>Stop</button>')
refs.stopBtn = document.querySelector('[data-stop]');
refs.stopBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      refs.endDate = selectedDates[0];
      if( refs.endDate <= Date.now()) {
        Notify.failure('Please choose a date in the future');
        timerStop();
        toRenderTimer(convertMs(0));
        return;
      }
      timerStop();
      toRenderTimer(convertMs(refs.endDate - Date.now()));
    },
  };

flatpickr("#datetime-picker", options);

refs.startBtn.addEventListener('click', onTimerStart);
refs.stopBtn.addEventListener('click', onTimerStop)

function onTimerStart () {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  refs.timerId = setInterval(() => {
    const deltaTime = refs.endDate - Date.now();
    if(deltaTime <= 0) {
      timerStop();
      Notify.info('Time is up', {cssAnimationStyle: 'zoom', closeButton: 'true',});
      return;
    };
    toRenderTimer(convertMs(deltaTime));
  }, 1000);
}

function onTimerStop () {
  timerStop ();
  Notify.info('The timer is stopped', {cssAnimationStyle: 'zoom',});
}

function timerStop () {
  clearInterval(refs.timerId);
  refs.startBtn.disabled = refs.endDate <= Date.now()? true : false;
  refs.stopBtn.disabled = true;
}

function toRenderTimer ({days, hours, minutes, seconds}) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}

function convertMs (ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero (value) {
  return value.toString().padStart(2, '0');
}