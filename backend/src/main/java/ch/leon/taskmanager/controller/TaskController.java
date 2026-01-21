package ch.leon.taskmanager.controller;

import ch.leon.taskmanager.model.Task;
import ch.leon.taskmanager.model.TaskStatus;
import ch.leon.taskmanager.service.TaskService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

  private final TaskService taskService;

  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  @GetMapping
  public List<Task> getAllTasks() {
    return taskService.getAllTasks();
  }

  @PostMapping
  public Task createTask(@RequestParam String title, @RequestParam String description) {
    return taskService.createTask(title, description);
  }

  @DeleteMapping("/{id}")
  public void deleteTask(@PathVariable Long id) {
    taskService.deleteTask(id);
  }

  @PatchMapping("/{id}/status")
  public Task updateStatus(@PathVariable Long id, @RequestParam TaskStatus status) {
    return taskService.updateTaskStatus(id, status);
  }
}
