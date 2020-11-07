const startBtn = document.querySelector("#startGame")! as HTMLElement;
const tryAgainBtn = document.querySelector("#tryAgain")!;
const gameOverModal = document.querySelector(".gameOver")! as HTMLElement;
const tiles = document.querySelectorAll(".tile") as NodeListOf<HTMLElement>;
const fails = document.querySelectorAll(".fail");
const roundDisplay = document.querySelector(".round")!;
const body = document.body;

interface GameState {
  round: number;
  fails: number;
  currentSequence: number[];
  userSequence: number[];
  userTurn: boolean;
}

const gameState: GameState = {
  round: 0,
  fails: 0,
  currentSequence: [],
  userSequence: [],
  userTurn: false,
};

const getRandomSequence = (iterations: number) => {
  let helperArr = [];

  for (let i = 0; i < iterations; i++) {
    let number = Math.floor(Math.random() * 4);
    helperArr.push(number);
  }

  gameState.currentSequence = [...helperArr];
  gameState.userSequence = [...helperArr];
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const flash = async (i: number) => {
  tiles[i].style.backgroundColor = "var(--grey)";
  await sleep(500);

  tiles[i].style.backgroundColor = "var(--yellow)";
  await sleep(500);
};

const playSequence = async (sequence: number[]) => {
  gameState.userTurn = false;

  await sleep(1500);

  for (let i = 0; i < sequence.length; i++) {
    await flash(sequence[i]);
  }
  gameState.userTurn = true;
};

tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    if (!gameState.userTurn) {
      return;
    }

    let tileNumber = Number(tile.id[4]);
    flash(tileNumber);

    if (tileNumber === gameState.userSequence[0]) {
      gameState.userSequence.shift();
    } else if (gameState.fails < 3) {
      fails[gameState.fails].classList.add("failed");
      gameState.fails += 1;
      gameState.userSequence = [...gameState.currentSequence];
      playSequence(gameState.currentSequence);
    } else {
      gameOverModal.classList.add("visible");
    }

    if (gameState.userSequence.length === 0) {
      gameState.round += 1;
      roundDisplay.innerHTML = `Round: ${gameState.round}`;
      getRandomSequence(gameState.round);
      playSequence(gameState.currentSequence);
    }
  });
});

const gameStart = async () => {
  gameState.userTurn = false;
  gameState.round = 1;
  gameState.fails = 0;

  roundDisplay.innerHTML = `Round: ${gameState.round}`;
  startBtn.style.animation = "none";
  startBtn.classList.add("hidden");
  body.classList.add("animateBackground");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  await sleep(1000);

  getRandomSequence(1);

  playSequence(gameState.currentSequence);
};

startBtn.addEventListener("click", () => gameStart());
tryAgainBtn.addEventListener("click", () => {
  fails.forEach((fail) => fail.classList.remove("failed"));
  gameOverModal.classList.remove("visible");
  gameStart();
});
