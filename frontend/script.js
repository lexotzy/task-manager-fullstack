const API_URL = 'http://localhost:8080/api/tasks';

async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();

  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task.title} - ${task.description}`;
    taskList.appendChild(li);
  })
}

async function AddTask() {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("description").value;

  await fetch(`${API_URL}?title=${title}&description=${desc}`, {method: 'POST'})

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  await fetchTasks();
}

window.addEventListener('load', async () => {
  try {
    await fetchTasks();
  } catch (error) {
    console.error("Fehler beim ersten Laden:", error);
  }
});