const video = document.querySelector('video');
const playButton = document.querySelector('.toggle');
const progressBar = document.querySelector('.progress__filled');

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

playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgressBar);