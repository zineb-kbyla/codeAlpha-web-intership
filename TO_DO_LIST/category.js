document.addEventListener('DOMContentLoaded', () => {
    const viewTaskButtons = document.querySelectorAll('.view-tasks-btn');
  
    viewTaskButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.target.closest('.card').getAttribute('data-category');
        window.location.href = `tasks.html?category=${category}`;
      });
    });
  
    function updateTaskCounts() {
      const categories = ['Personal', 'Work', 'Learning', 'Health'];
  
      categories.forEach(category => {
        const countElement = document.getElementById(`${category.toLowerCase()}-count`);
        const tasks = JSON.parse(localStorage.getItem(category)) || [];
        countElement.textContent = `${tasks.length} Tasks`;
      });
    }
  
    updateTaskCounts();
  });
  