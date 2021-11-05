const video = document.querySelector('video');
const playButton = document.querySelector('.toggle');
const progressBar = document.querySelector('.progress__filled');
const videoDurationBar = document.querySelector('.progress');
const rangeElements = document.querySelectorAll('.player__slider');

let isChangingVideoTime = false;

function togglePlay() {
  if (video.paused) {
    playButton.textContent = 'Ⅱ';
    video.play();
  } else {
    playButton.textContent = '►';
    video.pause();
  }
}

function updateProgressBar() {
  const progression = (video.currentTime / video.duration) * 100;
  progressBar.style.setProperty('flex-basis', `${progression}%`);
}

function updateVideoTime(e) {
  video.currentTime = video.duration * (e.offsetX / videoDurationBar.offsetWidth);
}

function updateParameter() {
  video[this.name] = this.value;
}

// toggle play/pause on click
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

// progress bar is being filled as video plays
video.addEventListener('timeupdate', updateProgressBar);

// duration bar clickable to change video current time
videoDurationBar.addEventListener('click', updateVideoTime);
videoDurationBar.addEventListener('mousemove', (e) => {
  if (isChangingVideoTime) updateVideoTime(e);
});
videoDurationBar.addEventListener('mousedown', () => isChangingVideoTime = true);
videoDurationBar.addEventListener('mouseup', () => isChangingVideoTime = false);
videoDurationBar.addEventListener('mouseout', () => isChangingVideoTime = false);

// handle volume and speed values
rangeElements.forEach(rangeElement => rangeElement.addEventListener('input', updateParameter));
