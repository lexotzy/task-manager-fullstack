package ch.leon.taskmanager.service;

import ch.leon.taskmanager.model.Task;
import ch.leon.taskmanager.model.TaskStatus;
import ch.leon.taskmanager.repository.TaskRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

  private final TaskRepository taskRepository;

  public TaskService(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  public List<Task> getAllTasks() {
    return taskRepository.findAll();
  }

  public Task createTask(String title, String description) {
    Task task = new Task(title, description);
    return taskRepository.save(task);
  }

  public void deleteTask(Long id) {
    taskRepository.deleteById(id);
  }

  public Task updateTaskStatus(Long id, TaskStatus newStatus) {
    Task task = taskRepository.findById(id).orElseThrow();
    task.setStatus(newStatus);
    return taskRepository.save(task);
  }
}
