const questionText = document.getElementById("questionText");
const choicesContainer = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("resultBox");
const scoreText = document.getElementById("scoreText");
const correctText = document.getElementById("correctText");
const totalText = document.getElementById("totalText");
const restartBtn = document.getElementById("restartBtn");
const quizBox = document.getElementById("quizBox");

const questions = [
  {
    question: "What is the capital city of France?",
    choices: ["Paris", "Madrid", "Rome", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
    answer: "William Shakespeare",
  },
  {
    question: "What is the smallest prime number?",
    choices: ["1", "2", "3", "5"],
    answer: "2",
  },
  {
    question: "In HTML, which tag is used for a paragraph?",
    choices: ["<p>", "<div>", "<span>", "<section>"],
    answer: "<p>",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedChoice = null;

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  questionText.textContent = `Q${currentQuestionIndex + 1}. ${q.question}`;
  choicesContainer.innerHTML = "";
  selectedChoice = null;

  q.choices.forEach((choiceText) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choiceText;
    btn.addEventListener("click", () => {
      if (selectedChoice) return; // lock after selecting

      selectedChoice = choiceText;
      document.querySelectorAll(".choice-btn").forEach((c) => c.classList.remove("selected"));
      btn.classList.add("selected");
    });
    choicesContainer.appendChild(btn);
  });

  nextBtn.disabled = false;
  nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.textContent = score;
  correctText.textContent = `${score / 10}`;
  totalText.textContent = questions.length;
}

nextBtn.addEventListener("click", () => {
  if (!selectedChoice) {
    alert("Please select an answer before continuing.");
    return;
  }

  if (selectedChoice === questions[currentQuestionIndex].answer) {
    score += 10;
  }

  currentQuestionIndex += 1;
  if (currentQuestionIndex >= questions.length) {
    showResult();
    return;
  }

  loadQuestion();
});

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
});

loadQuestion();