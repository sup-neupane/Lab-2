const clockEl = document.getElementById("clock");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const timerDisplay = document.getElementById("timerDisplay");
const alertEl = document.getElementById("alert");

let intervalId = null;
let remainingSeconds = 0;

function pad(value) {
  return value.toString().padStart(2, "0");
}

function updateClock() {
  const now = new Date();
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  clockEl.textContent = time;
}

function updateTimerDisplay() {
  const h = Math.floor(remainingSeconds / 3600);
  const m = Math.floor((remainingSeconds % 3600) / 60);
  const s = remainingSeconds % 60;
  timerDisplay.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function setAlert(message, type = "success") {
  alertEl.textContent = message;
  alertEl.className = `alert ${type}`;
  if (type === "removed") {
    alertEl.classList.add("hidden");
  } else {
    alertEl.classList.remove("hidden");
  }
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function startTimer() {
  if (intervalId) return;

  if (remainingSeconds <= 0) {
    setAlert("Enter a valid countdown time first.", "error");
    return;
  }

  setAlert("", "removed");
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;

  intervalId = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      setAlert("Time is up!", "success");
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      return;
    }

    remainingSeconds -= 1;
    updateTimerDisplay();
    if (remainingSeconds === 0) {
      stopTimer();
      setAlert("Time is up!", "success");
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    }
  }, 1000);
}

function pauseTimer() {
  stopTimer();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  setAlert("Timer paused.", "error");
}

function resetTimer() {
  stopTimer();
  remainingSeconds = 0;
  updateTimerDisplay();
  setAlert("Timer reset.", "removed");
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
}

function setTimerFromInputs() {
  const h = Number(hoursInput.value || 0);
  const m = Number(minutesInput.value || 0);
  const s = Number(secondsInput.value || 0);

  if (h < 0 || m < 0 || s < 0 || m > 59 || s > 59) {
    setAlert("Please enter valid time values (0-59 for minutes/seconds).", "error");
    return false;
  }

  remainingSeconds = h * 3600 + m * 60 + s;

  if (remainingSeconds <= 0) {
    setAlert("Please set a time greater than zero.", "error");
    return false;
  }

  updateTimerDisplay();
  setAlert("", "removed");
  resetBtn.disabled = false;
  return true;
}

startBtn.addEventListener("click", () => {
  if (remainingSeconds === 0) {
    if (!setTimerFromInputs()) return;
  }
  startTimer();
});

pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

setInterval(updateClock, 1000);
updateClock();
updateTimerDisplay();
