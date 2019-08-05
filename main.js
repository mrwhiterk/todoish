// Global todo list.
// Put a few todos in there to start with!
// This is mostly for testing purposes.
let todoList = ['mow the lawn', 'walk the dog', 'brush the cat'];

// Print a todo.
// For now, just console log it!
function printTodo(todo) {
  console.log(todo);
}

// Print everything on our todo list, INDIVIDUALLY.
// Make SURE to use the above function!
function printTodoList() {
  todoList.forEach(item => {
    printTodo(item);
  });
}

// Add an item to our todo list.
// Where on the list should we add it?
// No wrong answer here as long as you can defend the decision!
function addTodo(todo, index = 0) {
  todoList.splice(index, 0, todo);
  console.log(`added ${todo} at index: ${index}`);
}

// Remove an item at a given index from our todo list.
function removeTodo(index = 0) {
  let removedItem = todoList.splice(index, 1);
  console.log(`removed ${removedItem} from index: ${index}`);
}
