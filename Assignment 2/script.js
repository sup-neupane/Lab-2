const studentForm = document.getElementById("student-form");
const resultsBody = document.getElementById("results-body");
const clearAllBtn = document.getElementById("clear-all");

const students = [];

function calculateGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
}

function isPass(marks) {
  return Object.values(marks).every((v) => v >= 33);
}

function getStatus(percentage, marks) {
  return isPass(marks) && percentage >= 40 ? "Pass" : "Fail";
}

function renderTable() {
  resultsBody.innerHTML = "";

  students.forEach((student) => {
    const status = getStatus(student.percentage, student.marks);
    const row = document.createElement("tr");
    row.className = status === "Pass" ? "tr-pass" : "tr-fail";

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td>${student.total}</td>
      <td>${student.percentage.toFixed(2)}%</td>
      <td>${student.grade}</td>
      <td>${status}</td>
    `;

    resultsBody.appendChild(row);
  });
}

function validateStudent(data) {
  if (!data.name.trim() || !data.roll.trim()) {
    alert("Name and Roll No are required.");
    return false;
  }

  for (const [subject, mark] of Object.entries(data.marks)) {
    if (Number.isNaN(mark) || mark < 0 || mark > 100) {
      alert(`Invalid mark for ${subject}. Enter a value between 0 and 100.`);
      return false;
    }
  }

  return true;
}

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const studentData = {
    name: document.getElementById("name").value,
    roll: document.getElementById("roll").value,
    marks: {
      math: Number(document.getElementById("math").value),
      science: Number(document.getElementById("science").value),
      english: Number(document.getElementById("english").value),
      history: Number(document.getElementById("history").value),
      geography: Number(document.getElementById("geography").value),
    },
  };

  if (!validateStudent(studentData)) {
    return;
  }

  const total = Object.values(studentData.marks).reduce((sum, mark) => sum + mark, 0);
  const percentage = (total / 500) * 100;
  const grade = calculateGrade(percentage);

  students.push({
    ...studentData,
    total,
    percentage,
    grade,
  });

  renderTable();
  studentForm.reset();
});

clearAllBtn.addEventListener("click", () => {
  students.length = 0;
  renderTable();
});

renderTable();