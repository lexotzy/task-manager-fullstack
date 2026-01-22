const API_URL = 'http://localhost:8080/api/tasks';

async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();

  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const isDone = task.status === 'DONE';
    
    doneBtn.textContent = isDone ? "Wieder öffnen" : "Erledigt";

    li.textContent = `${task.title} - ${task.description}`;
    if (isDone) {
      li.style.textDecoration = 'line-through';
      li.style.color = 'gray';
    }

    deleteBtn.textContent = "Löschen";

    deleteBtn.onclick = () => deleteTask(task.id);
    doneBtn.onclick = () => {
      const nextStatus = isDone ? 'OPEN' : 'DONE';
      updateStatus(task.id, nextStatus);
    }

    li.appendChild(deleteBtn);
    li.appendChild(doneBtn);
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

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {method: 'DELETE'})
  await fetchTasks();
}

async function updateStatus(id, status) {
  await fetch(`${API_URL}/${id}/status?status=${status}`, {method: 'PATCH'})
  await fetchTasks();
}