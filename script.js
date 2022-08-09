const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const TimeBtn = document.querySelector("#TimeBtn");
let time = 0;
const timeEl = document.querySelector("#time");
const timeList = document.querySelector("#time-list");
const Board = document.querySelector("#board");
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

Board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    CreateRandomCircle();
  }
});

function startGame() {
  CreateRandomCircle();
  setInterval(decreaseTime, 1000);
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    GameOver();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function GameOver() {
  timeEl.parentNode.classList.add("hide");
  Board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function CreateRandomCircle() {
  const { width, height } = Board.getBoundingClientRect();
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  Board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
