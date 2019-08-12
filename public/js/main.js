const todoListSection = document.querySelector('.todoList');
const todoBtn = document.querySelector('#todoInputBtn');
const storage = JSON.parse(localStorage.getItem('todoList'));
let todoList = storage || [];

displayTodoList();

function getDate() {
  return new Date().toDateString();
}

todoBtn.addEventListener('click', (index = 0) => {
  let todoInput = document.querySelector('#todoInput');
  if (todoInput.value === '') {
    alert('Please enter text');
  } else {
    todoList.splice(index, 0, {
      body: todoInput.value,
      complete: false,
      date: getDate()
    });
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
      "<h6 id='date'>" +
      todo.date +
      '</h6>' +
      `<span>
        <button class='deleteBtn'>delete</button><button class='complete'>${
          todo.complete ? 'mark uncomplete' : 'complete'
        }</button></span>`;
    if (todo.complete) {
      todoItem.classList.add('done');
    }
    todoListSection.appendChild(todoItem);
  });

  populateDeleteButtons();
  populateCompleteButtons();
  populateEditText();
}

function populateDeleteButtons() {
  let deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach((item, i) => {
    item.addEventListener('click', evt => {
      todoList.splice(i, 1);
      evt.target.parentNode.innerHTML = '';
      save();
    });
  });
}

function populateCompleteButtons() {
  let completeButtons = document.querySelectorAll('.complete');
  completeButtons.forEach((item, i) => {
    item.addEventListener('click', evt => {
      todoList[i].complete = !todoList[i].complete;
      evt.target.parentNode.parentNode.childNodes[0].classList.toggle('done');
      moveDoneBottom();
      save();
    });
  });
}

function populateEditText() {
  let textItems = document.querySelectorAll('.todoList p');

  function resetDescriptions(currentIndex) {
    textItems.forEach((x, index) => {
      if (currentIndex !== index) {
        textItems[index].innerHTML = ``;
        textItems[index].textContent = todoList[index].body;
      }
    });
  }
  textItems.forEach((item, i) => {
    item.addEventListener('click', evt => {
      resetDescriptions(i);
      let input = document.createElement('input');
      input.classList.add('editInput');
      input.setAttribute('type', 'text');
      input.value = evt.target.textContent;
      evt.target.innerHTML = ``;
      evt.target.appendChild(input);

      input.addEventListener('blur', () => {
        todoList[i].body = input.value;
        save();
      });
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
