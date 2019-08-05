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
    todoItem.innerHTML = todo += "<button class='deleteBtn'>delete</button";
    todoListSection.appendChild(todoItem);
  });
  deleteBtns = document.querySelectorAll('.deleteBtn');

  deleteBtns.forEach(item => {
    item.addEventListener('click', evt => {
      todoList = todoList.filter(
        x => x + 'delete' !== evt.target.parentNode.textContent
      );
      evt.target.parentNode.innerHTML = '';
      localStorage.setItem('todoList', todoList);
    });
  });
}

displayTodoList();

todoBtn.addEventListener('click', addTodo);

function addTodo(index = 0) {
  let todoInput = document.querySelector('#todoInput');
  todoList.splice(index, 0, todoInput.value);
  todoInput.value = '';
  localStorage.setItem('todoList', todoList);
  displayTodoList();
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
