/* DOM Elements */

const form = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const categorySelect = document.querySelector("#category");
const taskContainer = document.querySelector("#taskContainer");
const themeBtn = document.querySelector("#themeBtn");

/* Task Functions */

function createTask(text, category, status = "pending") {
  const task = document.createElement("div");
  task.classList.add("task");
  task.dataset.id = Date.now();
  task.dataset.category = category;
  task.dataset.status = status;
  if (status === "completed") {
    task.classList.add("completed");
  }
  const title = document.createElement("p");
  title.classList.add("task-title");
  title.textContent = text;
  const categoryText = document.createElement("small");
  categoryText.textContent = `Category: ${category}`;
  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");
  completeBtn.innerHTML =
    status === "completed"
      ? '<i class="ri-arrow-go-back-line"></i>'
      : '<i class="ri-check-line"></i>';
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = '<i class="ri-edit-line"></i>';
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="ri-delete-bin-line"></i>';
  task.append(
    title,
    categoryText,
    document.createElement("br"),
    completeBtn,
    editBtn,
    deleteBtn,
  );
  taskContainer.appendChild(task);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach((task) => {
    tasks.push({
      text: task.querySelector(".task-title").textContent,
      category: task.dataset.category,
      status: task.dataset.status,
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    createTask(task.text, task.category, task.status);
  });
}

/* Add New Task */

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) return;
  createTask(taskText, categorySelect.value);
  saveTasks();
  form.reset();
});

/* Task Actions */

taskContainer.addEventListener("click", (e) => {
  const task = e.target.closest(".task");
  if (!task) return;
  // Delete
  if (e.target.closest(".delete-btn")) {
    task.remove();
    saveTasks();
  }
  // Complete
  if (e.target.closest(".complete-btn")) {
    const completeBtn = task.querySelector(".complete-btn");

    task.classList.toggle("completed");

    task.dataset.status = task.classList.contains("completed")
      ? "completed"
      : "pending";

    completeBtn.innerHTML = task.classList.contains("completed")
      ? '<i class="ri-arrow-go-back-line"></i>'
      : '<i class="ri-check-line"></i>';

    saveTasks();
  }
  // Edit
  if (e.target.closest(".edit-btn")) {
    const title = task.querySelector(".task-title");
    const updatedText = prompt("Edit Task", title.textContent);
    if (updatedText === null) return;
    if (updatedText.trim() === "") return;
    title.textContent = updatedText.trim();
    saveTasks();
  }
});

/* Theme Functions */

function updateThemeIcon() {
  if (document.body.classList.contains("dark")) {
    themeBtn.innerHTML = '<i class="ri-sun-line"></i>';
  } else {
    themeBtn.innerHTML = '<i class="ri-moon-line"></i>';
  }
}

function saveTheme() {
  const currentTheme = document.body.classList.contains("dark")
    ? "dark"
    : "light";
  localStorage.setItem("theme", currentTheme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
  updateThemeIcon();
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  updateThemeIcon();
  saveTheme();
});

/* Attributes vs Properties */

const checkBtn = document.querySelector("#checkBtn");
const demoInput = document.querySelector("#demoInput");
if (checkBtn && demoInput) {
  checkBtn.addEventListener("click", () => {
    console.log("Property:", demoInput.value);
    console.log("Attribute:", demoInput.getAttribute("value"));
  });
}

/* Event Bubbling/Capturing */
const grandparent = document.querySelector("#grandparent");
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

if (grandparent && parent && child) {
  // Bubbling
  grandparent.addEventListener("click", () => {
    console.log("Grandparent Bubbling");
  });
  parent.addEventListener("click", () => {
    console.log("Parent Bubbling");
  });
  child.addEventListener("click", () => {
    console.log("Child Bubbling");
  });
  // Capturing
  grandparent.addEventListener(
    "click",
    () => {
      console.log("Grandparent Capturing");
    },
    true,
  );
  parent.addEventListener(
    "click",
    () => {
      console.log("Parent Capturing");
    },
    true,
  );
  child.addEventListener(
    "click",
    () => {
      console.log("Child Capturing");
    },
    true,
  );
}

/* Footer */
let footer = document.createElement("footer");
footer.innerText = "© 2026 Task Manager • Made by Sudhanshu";
footer.style.display = "flex";
footer.style.justifyContent = "center";
footer.style.alignItems = "center";
footer.style.padding = "15px";
footer.style.fontWeight = "bold";
footer.style.marginTop = "20px";
document.body.append(footer);

/* Initial Load */

loadTasks();
loadTheme();

/* The End */
