const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const newGameBtn = document.getElementById("newGameBtn");
const feedbackText = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const highscoreEl = document.getElementById("highscore");
const attemptList = document.getElementById("attemptList");

let secretNumber;
let score;
let highscore = 0;
let attempts = [];

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  score = 100;
  attempts = [];
  scoreEl.textContent = score;
  feedbackText.textContent = "Start guessing...";
  feedbackText.className = "feedback";
  guessInput.value = "";
  attemptList.innerHTML = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;
  console.log("Secret number:", secretNumber);
}

function updateHistory(guess, feedback) {
  const li = document.createElement("li");
  li.textContent = `Guess ${attempts.length}: ${guess} → ${feedback}`;
  attemptList.prepend(li);
}

function setFeedback(message, status) {
  feedbackText.textContent = message;
  feedbackText.className = `feedback ${status}`;
}

function handleGuess() {
  const value = Number(guessInput.value);

  if (!value || value < 1 || value > 100) {
    setFeedback("Enter a number between 1 and 100", "high");
    return;
  }

  if (score <= 0) {
    setFeedback("Game over. Press New Game.", "high");
    return;
  }

  if (attempts.some((item) => item.guess === value)) {
    setFeedback("You already tried that number.", "high");
    return;
  }

  score -= 10;
  attempts.push({ guess: value, score });

  if (value === secretNumber) {
    setFeedback("Correct! You win!", "correct");
    scoreEl.textContent = score;
    attemptList.innerHTML = "";
    updateHistory(value, "Correct");
    highscore = Math.max(highscore, score);
    highscoreEl.textContent = highscore;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    return;
  }

  if (value > secretNumber) {
    setFeedback("Too high!", "high");
    updateHistory(value, "Too high");
  } else {
    setFeedback("Too low!", "low");
    updateHistory(value, "Too low");
  }

  if (score <= 0) {
    score = 0;
    setFeedback(`Game over! Number was ${secretNumber}.`, "high");
    guessInput.disabled = true;
    guessBtn.disabled = true;
  }

  scoreEl.textContent = score;
}

guessBtn.addEventListener("click", () => {
  handleGuess();
  guessInput.value = "";
  guessInput.focus();
});

guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGuess();
    guessInput.value = "";
  }
});

newGameBtn.addEventListener("click", resetGame);

resetGame();