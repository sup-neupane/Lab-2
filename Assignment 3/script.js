const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const filterButtons = document.querySelectorAll(".filter-btn");

const tasks = [];
let activeFilter = "all";

function updateStatus() {
  totalTasks.textContent = `${tasks.length} tasks`;
  const doneCount = tasks.filter((t) => t.completed).length;
  completedTasks.textContent = `${doneCount} completed`;
}

function getFilteredTasks() {
  if (activeFilter === "completed") return tasks.filter((t) => t.completed);
  if (activeFilter === "pending") return tasks.filter((t) => !t.completed);
  return tasks;
}

function renderTasks() {
  taskList.innerHTML = "";
  const filtered = getFilteredTasks();

  if (filtered.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No tasks found.";
    empty.style.color = "#6b7280";
    taskList.appendChild(empty);
    updateStatus();
    return;
  }

  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const text = document.createElement("span");
    text.textContent = task.text;

    label.appendChild(checkbox);
    label.appendChild(text);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      const idx = tasks.findIndex((t) => t.id === task.id);
      if (idx >= 0) tasks.splice(idx, 1);
      renderTasks();
    });

    li.appendChild(label);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateStatus();
}

function addTask() {
  const value = taskInput.value.trim();
  if (!value) return;

  tasks.push({ id: Date.now(), text: value, completed: false });
  taskInput.value = "";
  renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderTasks();
  });
});

renderTasks();