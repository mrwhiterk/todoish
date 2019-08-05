let todoListSection = document.querySelector('.todoList');

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

//
function displayTodoList() {
  todoList.forEach(todo => {
    let todoItem = document.createElement('li');
    todoItem.textContent = todo;
    todoListSection.appendChild(todoItem);
  })
}

displayTodoList()

function addTodo(todo, index = 0) {
  todoList.splice(index, 0, todo);
  localStorage.setItem('todoList', todoList);
  console.log(`added ${todo} at index: ${index}`);
}

function removeTodo(index = 0) {
  let removedItem = todoList.splice(index, 1);
  localStorage.setItem('todoList', todoList);
  console.log(`removed ${removedItem} from index: ${index}`);
}

function clear() {
  localStorage.clear();
}
