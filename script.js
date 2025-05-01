const gameArea = document.getElementById('gameArea');
const reactionTimeText = document.getElementById('reactionTime');
const bestTimeText = document.getElementById('bestTime');
const clickCountText = document.getElementById('clickCount');
const timeLeftText = document.getElementById('timeLeft');
const difficultySelect = document.getElementById('difficulty');

const summary = document.getElementById('summary');
const finalClicks = document.getElementById('finalClicks');
const finalBest = document.getElementById('finalBest');
const clickSound = document.getElementById('clickSound');

let circle;
let startTime;
let bestTime = null;
let clickCount = 0;
let gameDuration = 30;
let timer;
let countdown;

function startGame() {
  if (circle) circle.remove();
  summary.style.display = 'none';

  bestTime = null;
  clickCount = 0;
  bestTimeText.textContent = '--';
  clickCountText.textContent = '0';
  reactionTimeText.textContent = '--';
  timeLeftText.textContent = gameDuration;

  let timeLeft = gameDuration;
  countdown = setInterval(() => {
    timeLeft--;
    timeLeftText.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  showCircleWithDelay();
}

function showCircleWithDelay() {
  const delay = Math.random() * 2000 + 500;
  timer = setTimeout(showCircle, delay);
}

function showCircle() {
  if (circle) circle.remove();

  const difficulty = difficultySelect.value;
  let size, color;

  if (difficulty === 'easy') {
    size = 70;
    color = '#22c55e';
  } else if (difficulty === 'medium') {
    size = 50;
    color = '#f97316';
  } else {
    size = 30;
    color = '#ef4444';
  }

  circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.backgroundColor = color;

  const maxX = gameArea.clientWidth - size;
  const maxY = gameArea.clientHeight - size;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  gameArea.appendChild(circle);

  startTime = Date.now();

  circle.addEventListener('click', () => {
    const endTime = Date.now();
    const reactionTime = endTime - startTime;
    reactionTimeText.textContent = reactionTime + ' ms';
    clickCount++;
    clickCountText.textContent = clickCount;

    if (bestTime === null || reactionTime < bestTime) {
      bestTime = reactionTime;
      bestTimeText.textContent = bestTime + ' ms';
    }

    clickSound.currentTime = 0;
    clickSound.play();

    circle.remove();
    showCircleWithDelay();
  });
}

function endGame() {
  clearTimeout(timer);
  clearInterval(countdown);
  if (circle) circle.remove();

  finalClicks.textContent = clickCount;
  finalBest.textContent = bestTime !== null ? bestTime + ' ms' : '--';
  summary.style.display = 'block';
}
