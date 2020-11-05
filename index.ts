const startBtn = document.querySelector(".btn")!;
const tiles = document.querySelectorAll(".tile");
const fails = document.querySelectorAll(".fail");
const round = document.querySelector(".score");
const body = document.body;

interface gameState {
  started: boolean;
  round: number;
  fails: number;
  currentSequence: number[] | null;
}

const gameState: gameState = {
  started: false,
  round: 0,
  fails: 0,
  currentSequence: null,
};

const getRandomSequence = (iterations: number): number[] => {
  let helperArr = [];

  for (let i = 0; i < iterations; i++) {
    let number = Math.floor(Math.random() * 4);
    helperArr.push(number);
  }

  gameState.currentSequence = helperArr;
  return helperArr; // 0 - 3
};

const mainGameLoop = (round: number) => {
  console.log("started");
  startBtn.classList.add("hidden");
  body.classList.add("animateBackground");
  gameState.started = true;

  getRandomSequence(round + 1);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

startBtn.addEventListener("click", () => mainGameLoop(gameState.round));
