let todos = [];
let nextTodoId = 1;

const todoList = document.getElementById('todo-list');
const totalCountSpan = document.getElementById('total-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

window.addEventListener('load', () => {
  loadTodosFromStorage();
  renderTodoList();
  updateCounters();
});

function addNewTodo() {
  const todoText = prompt('Please enter a new TODO item:');
  if (todoText) {
    const newTodo = { id: nextTodoId++, text: todoText, done: false };
    todos.push(newTodo);
    saveTodosToStorage();
    renderTodoList();
    updateCounters();
  }
}

function createTodoItem(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.done ? 'checked' : ''} onchange="toggleTodoStatus(${todo.id})" />
      <label for="${todo.id}" class="${todo.done ? 'text-success text-decoration-line-through' : ''}">${todo.text}</label>
      <button class="btn btn-danger btn-sm float-end" onclick="removeTodoItem(${todo.id})">Delete</button>
    </li>
  `;
}

function renderTodoList() {
  todoList.innerHTML = todos.map(todo => createTodoItem(todo)).join('');
}

function updateCounters() {
  totalCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.done).length;
}

function removeTodoItem(todoId) {
  todos = todos.filter(todo => todo.id !== todoId);
  saveTodosToStorage();
  renderTodoList();
  updateCounters();
}

function toggleTodoStatus(todoId) {
  const todo = todos.find(todo => todo.id === todoId);
  if (todo) {
    todo.done = !todo.done;
    saveTodosToStorage();
    renderTodoList();
    updateCounters();
  }
}

function saveTodosToStorage() {
  localStorage.setItem('todoItems', JSON.stringify(todos));
  localStorage.setItem('nextTodoId', nextTodoId);
}

function loadTodosFromStorage() {
  const savedTodos = localStorage.getItem('todoItems');
  const savedNextTodoId = localStorage.getItem('nextTodoId');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
  if (savedNextTodoId) {
    nextTodoId = parseInt(savedNextTodoId, 10);
  }
}
