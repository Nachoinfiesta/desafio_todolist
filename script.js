$(document).ready(function() {
    const tasks = [
      { id: 1, description: "Hacer la compra", completed: false },
      { id: 2, description: "Estudiar para el examen", completed: true },
      { id: 3, description: "Ejercicio físico", completed: false }
    ];
  
    const taskList = $("#taskList");
    const totalTasksSpan = $("#totalTasks");
    const completedTasksSpan = $("#completedTasks");
    const taskInput = $("#taskInput");
  
    function updateTaskList() {
      taskList.empty();
      tasks.forEach(task => {
        const li = $(document.createElement("li"));
        const statusSymbol = task.completed ? '✓' : 'X';
        li.html(`
          <span class="${task.completed ? 'completed' : ''}">
            ${task.id}: ${task.description}
          </span>
          <button class="toggleBtn" data-id="${task.id}">${statusSymbol}</button>
          <button class="deleteBtn" data-id="${task.id}">X</button>
        `);
        taskList.append(li);
      });
  
      totalTasksSpan.text(tasks.length);
      completedTasksSpan.text(tasks.filter(task => task.completed).length);
    }
  
    function addTask() {
      const description = taskInput.val().trim();
      if (description !== "") {
        const newTask = {
          id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
          description,
          completed: false
        };
        tasks.push(newTask);
        taskInput.val("");
        updateTaskList();
      }
    }
  
    function deleteTask(id) {
      const index = tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        tasks.splice(index, 1);
        updateTaskList();
      }
    }
  
    function toggleTask(id) {
      const index = tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        tasks[index].completed = !tasks[index].completed;
        updateTaskList();
      }
    }
  
    // Event listeners
    $("#addTaskBtn").on("click", addTask);
    taskList.on("click", ".toggleBtn", function() {
      const taskId = $(this).data("id");
      toggleTask(taskId);
    });
    taskList.on("click", ".deleteBtn", function() {
      const taskId = $(this).data("id");
      deleteTask(taskId);
    });
  
    // Initial render
    updateTaskList();
  });
  
  
  