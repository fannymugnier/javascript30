const video = document.querySelector('video');
const playButton = document.querySelector('.toggle');

function togglePlay(e) {
  if (video.paused) {
    playButton.textContent = 'Ⅱ';
    video.play();
  } else {
    playButton.textContent = '►';
    video.pause();
  }
}

playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);