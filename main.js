let todoListSection = document.querySelector('.todoList');
let todoBtn = document.querySelector('#todoInputBtn');
let deleteBtn;
let storage = JSON.parse(localStorage.getItem('todoList'));

let todoList = storage || [
  { body: 'walk the dog', complete: false },
  { body: 'mow the lawn', complete: true }
];

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
      todo.body +
      '</p>' +
      "<span><button class='deleteBtn'>delete</button><button class='complete'>toggle complete</button></span>";
    if (todo.complete) {
      todoItem.classList.add('done');
    }
    todoListSection.appendChild(todoItem);
  });

  let deleteBtns = document.querySelectorAll('.deleteBtn');
  deleteBtns.forEach((item, i) => {
    item.addEventListener('click', evt => {
      todoList.splice(i, 1);
      setStorage();
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
    todoList.splice(index, 0, { body: todoInput.value, complete: false });
    todoInput.value = '';
    setStorage();
    displayTodoList();
  }
}

function removeTodo(index = 0) {
  let removedItem = todoList.splice(index, 1);
  setStorage();
}

function setStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
