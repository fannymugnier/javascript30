const timerElement = document.querySelector('.display__time-left');
const endTimeElement = document.querySelector('.display__end-time');
const timeButtons = document.querySelectorAll('[data-time]');
let countdown;

function startTimer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const remainingSeconds = Math.round((then - Date.now()) / 1000);

    if (remainingSeconds < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(remainingSeconds);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`; // add trailing zero

  document.title = display;
  timerElement.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  // const adjustedHour = hour > 12 ? hour - 12 : hour; // 12 hour system

  endTimeElement.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function handleButtonClick() {
  const seconds = parseInt(this.dataset.time);

  startTimer(seconds);
}

timeButtons.forEach(button => button.addEventListener('click', handleButtonClick));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  startTimer(mins * 60);
  this.reset();
});