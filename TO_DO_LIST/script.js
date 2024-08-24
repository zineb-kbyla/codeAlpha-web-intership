const cards = document.querySelectorAll('.card');
const addTaskModal = document.getElementById('add-task-modal');
const closeModalBtn = document.querySelector('.close');
const addTaskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskActionsContainer = document.getElementById('task-actions-container');
const categoryTitle = document.getElementById('category-title');
const editTaskBtn = document.getElementById('edit-task-btn');
const deleteTaskBtn = document.getElementById('delete-task-btn');
const addTaskBtn = document.getElementById('add-task-btn');

let currentCategory;
let selectedTaskElement;

// Event listeners for cards
cards.forEach(card => {
  card.addEventListener('click', () => {
    currentCategory = card.dataset.category;
    categoryTitle.textContent = `${currentCategory} Tasks`;
    updateTaskList();
    taskActionsContainer.style.display = 'block';
  });
});

// Close modal
closeModalBtn.addEventListener('click', () => {
  addTaskModal.style.display = 'none';
});

// Open modal to add task
addTaskBtn.addEventListener('click', () => {
  addTaskModal.style.display = 'block';
});

// Add task
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const taskText = taskInput.value.trim();
  
  if (taskText === "") return;
  
  const listItem = document.createElement('li');
  listItem.textContent = taskText;
  listItem.dataset.category = currentCategory;
  listItem.addEventListener('click', () => {
    selectedTaskElement = listItem;
    // Highlight selected task (optional)
    document.querySelectorAll('#task-list li').forEach(li => li.classList.remove('selected'));
    listItem.classList.add('selected');
  });
  taskList.appendChild(listItem);
  
  // Clear input and close modal
  taskInput.value = "";
  addTaskModal.style.display = 'none';
});

// Edit task
editTaskBtn.addEventListener('click', () => {
  if (!selectedTaskElement) return;
  
  const newTaskText = prompt('Edit Task:', selectedTaskElement.textContent);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    selectedTaskElement.textContent = newTaskText;
  }
});

// Delete task
deleteTaskBtn.addEventListener('click', () => {
  if (selectedTaskElement) {
    selectedTaskElement.remove();
    selectedTaskElement = null;
  }
});

// Update task list
function updateTaskList() {
  taskList.innerHTML = '';
  // Fetch and display tasks for the current category if they exist
  // For now, this is an example of adding tasks directly
}

// Optionally highlight selected task
const taskListItems = document.querySelectorAll('#task-list li');
taskListItems.forEach(item => {
  item.addEventListener('click', () => {
    selectedTaskElement = item;
    taskListItems.forEach(li => li.classList.remove('selected'));
    item.classList.add('selected');
  });
});
