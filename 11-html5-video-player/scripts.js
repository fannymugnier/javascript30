const video = document.querySelector('video');
const playButton = document.querySelector('.toggle');
const progressBar = document.querySelector('.progress__filled');
const videoDurationBar = document.querySelector('.progress');
const rangeElements = document.querySelectorAll('.player__slider');
const timer = document.querySelector('.player__timer');
const skipButtons = document.querySelectorAll('[data-skip]');

let isSlidingTime = false;

function togglePlay() {
  if (video.paused) {
    playButton.textContent = 'Ⅱ';
    video.play();
  } else {
    playButton.textContent = '►';
    video.pause();
  }
}

function updateDisplayedTimer() {
  const minutes = ('00' + parseInt(video.currentTime / 60)).slice(-2);
  const seconds = ('00' + parseInt(video.currentTime % 60)).slice(-2);
  timer.textContent = `${minutes}:${seconds}`;
}

function updateProgressBar() {
  const progression = (video.currentTime / video.duration) * 100;
  progressBar.style.setProperty('flex-basis', `${progression}%`);
}

function handleTimeSliding(e) {
  video.currentTime = video.duration * (e.offsetX / videoDurationBar.offsetWidth);
}

function updateParameter() {
  video[this.name] = this.value;
}

function skipTime() {
  video.currentTime += parseInt(this.dataset.skip);
}

// toggle play/pause on click
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

// progress bar is being filled as video plays
video.addEventListener('timeupdate', () => {
  updateProgressBar();
  updateDisplayedTimer();
});

// duration bar clickable to change video current time
videoDurationBar.addEventListener('click', handleTimeSliding);
videoDurationBar.addEventListener('mousemove', (e) => {
  if (isSlidingTime) handleTimeSliding(e);
});
videoDurationBar.addEventListener('mousedown', () => isSlidingTime = true);
videoDurationBar.addEventListener('mouseup', () => isSlidingTime = false);
videoDurationBar.addEventListener('mouseout', () => isSlidingTime = false);

// handle volume and speed values
rangeElements.forEach(rangeElement => rangeElement.addEventListener('input', updateParameter));

// handle skip buttons (-10s or +25s)
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skipTime));
