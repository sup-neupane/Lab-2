const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clear-history");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
const buttons = document.querySelectorAll("button[data-val]");

const history = [];

function renderHistory() {
  historyList.innerHTML = "";
  for (let i = 0; i < history.length; i++) {
    const item = document.createElement("li");
    item.textContent = history[i];
    historyList.appendChild(item);
  }
}

function pushHistory(entry) {
  history.unshift(entry);
  if (history.length > 5) {
    history.pop();
  }
  renderHistory();
}

function compute(expression) {
  if (!expression.trim()) return "";

  // Block invalid characters for security and correctness
  if (!/^[0-9.+\-*/ ()]+$/.test(expression)) {
    return "ERROR: invalid input";
  }

  try {
    const result = eval(expression);

    if (result === Infinity || result === -Infinity) {
      return "ERROR: divide by zero";
    }
    if (Number.isNaN(result)) {
      return "ERROR: invalid value";
    }

    return Number.isFinite(result) ? result : "ERROR: out of range";
  } catch (e) {
    return "ERROR: invalid expression";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    display.value += button.dataset.val;
  });
});

equalsBtn.addEventListener("click", () => {
  const expression = display.value;
  const result = compute(expression);

  if (typeof result === "number" || !result.startsWith("ERROR")) {
    display.value = result;
    pushHistory(`${expression} = ${result}`);
  } else {
    display.value = result;
  }
});

clearBtn.addEventListener("click", () => {
  display.value = "";
});

clearHistoryBtn.addEventListener("click", () => {
  history.length = 0;
  renderHistory();
});

renderHistory();
