let todoListSection = document.querySelector('.todoList');
let todoBtn = document.querySelector('#todoInputBtn');
let deleteBtn;
let storage = localStorage.getItem('todoList');

let todoList =
  storage !== null ? storage.split(',') : ['walk the dog', 'mow the lawn'];

function printTodo(todo) {
  console.log(todo);
}

function printTodoList() {
  todoList.forEach(item => {
    printTodo(item);
  });
}

function displayTodoList() {
  document.querySelector('.todoList').innerHTML = '';
  todoList.forEach(todo => {
    let todoItem = document.createElement('li');
    todoItem.innerHTML = todo +=
      "<span><span><button class='deleteBtn'>delete</button><button class='complete'>complete</button>";
    todoListSection.appendChild(todoItem);
  });
  deleteBtns = document.querySelectorAll('.deleteBtn');

  deleteBtns.forEach((item, i) => {
    item.addEventListener('click', evt => {
      todoList.splice(i, 1);
      localStorage.setItem('todoList', todoList);
      evt.target.parentNode.innerHTML = '';
      displayTodoList();
    });
  });

  // deleteBtns = document.querySelectorAll('.complete');
}

displayTodoList();

todoBtn.addEventListener('click', addTodo);

function addTodo(index = 0) {
  let todoInput = document.querySelector('#todoInput');
  if (todoInput.value === '') {
    alert('Please enter text');
  } else {
    todoList.splice(index, 0, todoInput.value);
    todoInput.value = '';
    localStorage.setItem('todoList', todoList);
    displayTodoList();
  }
}

function removeTodo(index = 0) {
  let removedItem = todoList.splice(index, 1);
  localStorage.setItem('todoList', todoList);
}

function clear() {
  localStorage.clear();
  displayTodoList();
  location.reload();
}
