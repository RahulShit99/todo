const inputBox = document.getElementById('inputBox');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');
const totalTasks = document.getElementById('totalTasks');

let tasks = [];

addButton.addEventListener('click', function() {
  if (inputBox.value !== '') {
    const task = {
      id: Date.now(),
      text: inputBox.value,
      checked: false
    };

    tasks.push(task);
    addToLocalStorage(tasks);
    inputBox.value = '';
  }
});

function renderTasks(tasks) {
  todoList.innerHTML = '';

  tasks.forEach(function(task) {
    const li = document.createElement('li');
    li.setAttribute('class', task.checked ? 'checked' : '');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${task.checked ? 'checked' : ''}>
      <span>${task.text}</span>
      <span class="delete">×</span>
    `;
    todoList.append(li);
  });

  totalTasks.innerHTML = `Total tasks: ${tasks.length}`;
}

function addToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks(tasks);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('tasks');
  if (reference) {
    tasks = JSON.parse(reference);
    renderTasks(tasks);
  }
}

getFromLocalStorage();

todoList.addEventListener('click', function(e) {
  if (e.target.type === 'checkbox') {
    const id = e.target.parentElement.getAttribute('data-id');
    tasks.forEach(function(task) {
      if (task.id === parseInt(id)) {
        task.checked = e.target.checked;
      }
    });
    addToLocalStorage(tasks);
    const span = e.target.nextElementSibling;
    if (e.target.checked) {
      span.style.textDecoration = 'line-through';
      span.style.opacity = '0.5';
    } else {
      span.style.textDecoration = 'none';
      span.style.opacity = '1';
    }
  }

  if (e.target.classList.contains('delete')) {
    const id = e.target.parentElement.getAttribute('data-id');
    tasks = tasks.filter(function(task) {
      return task.id !== parseInt(id);
    });
    addToLocalStorage(tasks);
    e.target.parentElement.remove();
  }
});
