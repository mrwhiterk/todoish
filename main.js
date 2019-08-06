const todoListSection = document.querySelector('.todoList');
const todoBtn = document.querySelector('#todoInputBtn');
let storage = JSON.parse(localStorage.getItem('todoList'));
let todoList = storage || [];

displayTodoList();

todoBtn.addEventListener('click', (index = 0) => {
  let todoInput = document.querySelector('#todoInput');
  if (todoInput.value === '') {
    alert('Please enter text');
  } else {
    todoList.splice(index, 0, { body: todoInput.value, complete: false });
    todoInput.value = '';
    save();
  }
});

function displayTodoList() {
  document.querySelector('.todoList').innerHTML = '';
  todoList.forEach(todo => {
    let todoItem = document.createElement('li');
    todoItem.innerHTML =
      "<p id='todo'>" +
      todo.body +
      '</p>' +
      `<span>
        <button class='deleteBtn'>delete</button><button class='complete'>${
          todo.complete ? 'mark uncomplete' : 'complete'
        }</button></span>`;
    if (todo.complete) {
      todoItem.classList.add('done');
    }
    todoListSection.appendChild(todoItem);
  });

  populateDeleteBtns();

  populateCompleteBtns();

  populateEditText();
}

function populateDeleteBtns() {
  let deleteBtns = document.querySelectorAll('.deleteBtn');
  deleteBtns.forEach((item, i) => {
    item.addEventListener('click', evt => {
      todoList.splice(i, 1);
      evt.target.parentNode.innerHTML = '';
      save();
    });
  });
}

function populateCompleteBtns() {
  let completeBtns = document.querySelectorAll('.complete');
  completeBtns.forEach((item, i) => {
    item.addEventListener('click', evt => {
      todoList[i].complete = !todoList[i].complete;
      evt.target.parentNode.parentNode.childNodes[0].classList.toggle('done');
      moveDoneBottom();
      save();
    });
  });
}

function populateEditText(params) {
  let textItems = document.querySelectorAll('.todoList p');
  textItems.forEach((item, i) => {
    item.addEventListener('click', (evt, j) => {
      // todoList[i].complete = !todoList[i].complete;
      // evt.target.parentNode.parentNode.childNodes[0].classList.toggle('done');
      // moveDoneBottom();
      // save();
      console.log(evt.target);
    });
  });
}

function save() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
  displayTodoList();
}

function moveDoneBottom() {
  let newArr = [];
  todoList.forEach((item, i) => {
    item.complete ? newArr.push(item) : newArr.unshift(item);
  });
  todoList = newArr;
}
