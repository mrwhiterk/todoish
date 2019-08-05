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
    todoItem.innerHTML =
      "<p id='todo'>" +
      todo +
      '</p>' +
      "<span><button class='deleteBtn'>delete</button><button class='complete'>toggle complete</button></span>";
    todoListSection.appendChild(todoItem);
  });
  let deleteBtns = document.querySelectorAll('.deleteBtn');

  deleteBtns.forEach((item, i) => {
    item.addEventListener('click', evt => {
      todoList.splice(i, 1);
      localStorage.setItem('todoList', todoList);
      evt.target.parentNode.innerHTML = '';
      displayTodoList();
    });
  });

  let completeBtns = document.querySelectorAll('.complete');
  completeBtns.forEach((item, i) => {
    item.addEventListener('click', evt => {
      evt.target.parentNode.parentNode.childNodes[0].classList.toggle('done');
    });
  });
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
