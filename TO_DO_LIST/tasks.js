document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const categoryTitle = document.getElementById('category-title');
    const taskList = document.getElementById('task-list');
  
    categoryTitle.textContent = `${category} Tasks`;
  
    const addTaskModal = document.getElementById('add-task-modal');
    const editTaskModal = document.getElementById('edit-task-modal');
    const backBtn = document.getElementById('back-btn');
    const addTaskBtn = document.getElementById('add-task-btn');
    const closeAddModal = document.getElementById('close-add-modal');
    const closeEditModal = document.getElementById('close-edit-modal');
    const addTaskForm = document.getElementById('add-task-form');
    const editTaskForm = document.getElementById('edit-task-form');
    const taskInput = document.getElementById('task-input');
    const editTaskInput = document.getElementById('edit-task-input');
    const saveTaskBtn = document.getElementById('save-task-btn');
    const deleteTaskBtn = document.getElementById('delete-task-btn');
    const checkTaskBtn = document.getElementById('check-task-btn');
  
    let tasks = JSON.parse(localStorage.getItem(category)) || [];
    let editingIndex = null;
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.description;
        if (task.completed) li.classList.add('completed');
        li.classList.add('task-item');
  
        const actions = document.createElement('div');
        actions.className = 'task-actions';
  
        const checkIcon = document.createElement('i');
        checkIcon.className = 'fas fa-check-circle';
        checkIcon.addEventListener('click', () => handleTaskAction(index, 'check'));
  
        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit';
        editIcon.addEventListener('click', () => handleTaskAction(index, 'edit'));
  
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash';
        deleteIcon.addEventListener('click', () => handleTaskAction(index, 'delete'));
  
        actions.appendChild(checkIcon);
        actions.appendChild(editIcon);
        actions.appendChild(deleteIcon);
        li.appendChild(actions);
        taskList.appendChild(li);
      });
    }
  
    function openAddTaskModal() {
      addTaskModal.style.display = 'block';
    }
  
    function closeAddTaskModal() {
      addTaskModal.style.display = 'none';
    }
  
    function openEditTaskModal() {
      editTaskModal.style.display = 'block';
    }
  
    function closeEditTaskModal() {
      editTaskModal.style.display = 'none';
    }
  
    function handleTaskAction(index, action) {
      editingIndex = index;
      if (action === 'edit') {
        editTaskInput.value = tasks[index].description;
        editTaskForm.onsubmit = (e) => {
          e.preventDefault();
          tasks[index].description = editTaskInput.value;
          saveTasks();
          closeEditTaskModal();
        };
        openEditTaskModal();
      } else if (action === 'delete') {
        if (confirm('Are you sure you want to delete this task?')) {
          tasks.splice(index, 1);
          saveTasks();
        }
      } else if (action === 'check') {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
      }
    }
  
    function saveTasks() {
      localStorage.setItem(category, JSON.stringify(tasks));
      renderTasks();
    }
  
    addTaskBtn.addEventListener('click', openAddTaskModal);
    closeAddModal.addEventListener('click', closeAddTaskModal);
    closeEditModal.addEventListener('click', closeEditTaskModal);
  
    addTaskForm.onsubmit = (e) => {
      e.preventDefault();
      tasks.push({ description: taskInput.value, completed: false });
      saveTasks();
      closeAddTaskModal();
    };
  
    backBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  
    renderTasks();
  });
  