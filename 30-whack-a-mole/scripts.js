const moles = document.querySelectorAll('.mole');
const holes = document.querySelectorAll('.hole');
const startButton = document.querySelector('.start-btn');
const gameScore = document.querySelector('.game-score');
const scoreboard = document.querySelector('.scores');
const bloodSplatter = Object.assign(document.createElement('div'), { className: 'blood-splatter' });
let gameInProgress;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHole() {
  const randomInt = getRandomInt(1, holes.length);
  return document.querySelector(`.hole${randomInt}`);
}

function spawnMole() {
  const randomHole = getRandomHole();

  randomHole.classList.add('up');
  setTimeout(() => randomHole.classList.remove('up'), 500);
}

function toggleBloodSplatter(parentElement, displayed = true) {
  if (displayed) {
    parentElement.appendChild(bloodSplatter);
  } else {
    parentElement.removeChild(bloodSplatter);
  }
}

function toggleDisplay(element) {
  element.classList.toggle('hidden');
}

function whackTheMole() {
  const currentHole = this.parentElement;
  
  toggleBloodSplatter(currentHole);
  toggleDisplay(this);
  incrementScore();
  
  setTimeout(() => {
    toggleBloodSplatter(currentHole, false);
    toggleDisplay(this);
  }, 200);
}

function incrementScore() {
  gameScore.textContent = parseInt(gameScore.textContent) + 1;
}

function resetScore() {
  const newScore = document.createElement('li');
  
  newScore.textContent = gameScore.textContent;
  scoreboard.appendChild(newScore);
  gameScore.textContent = 0;
}

function makeMolesHittable(hittable = true) {
  if (hittable) {
    moles.forEach(mole => mole.addEventListener('click', whackTheMole));
  } else {
    moles.forEach(mole => mole.removeEventListener('click', whackTheMole));
  }
}

function timeIsOut(end) {
  const remainingSeconds = Math.round((end - Date.now()) / 1000);

  return remainingSeconds < 0;
}

function getEndOfTimer() {
  const timerInSeconds = 10;
  const now = Date.now();
  
  return now + timerInSeconds * 1000;
}

function startSpawn() {
  const endOfTimer = getEndOfTimer();

  gameInProgress = setInterval(() => {
    if (timeIsOut(endOfTimer)) {
      clearInterval(gameInProgress);
      makeMolesHittable(false);
      resetScore();
      toggleDisplay(startButton);

      return;
    }
    
    spawnMole();
  }, 500);
}

function startGame() {
  clearInterval(gameInProgress);
  toggleDisplay(startButton);
  makeMolesHittable();
  startSpawn();
}

function changeCursor(down = true) {
  if (down) {
    document.documentElement.style.setProperty('--cursor', 'url("mallet-down.png")');
  } else {
    document.documentElement.style.setProperty('--cursor', 'url("mallet-up.png")');
  }
}

startButton.addEventListener('click', startGame);
window.addEventListener('mousedown', changeCursor);
window.addEventListener('mouseup', () => changeCursor(false));