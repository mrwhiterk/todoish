let todoBodies = document.querySelectorAll('.todo');

function setBodyEventListeners() {
  [...todoBodies].forEach(todoBody => {
    todoBody.addEventListener('click', editTextMode);
  });
}

setBodyEventListeners();

function editTextMode(e) {
  e.target.removeEventListener('click', editTextMode);

  let idDiv = e.target.querySelector('#todoId');
  if (!idDiv) {
    alert('cannot edit completed todos!');
    return;
  }
  let id = idDiv.value;

  let todoText = e.target.innerText;
  e.target.innerHTML = `<input id='editForm' type='text' value='${todoText}' />`;

  let editForm = document.querySelector('#editForm');

  editForm.addEventListener('blur', e => {
    let newText = e.target.value;

    axios
      .post(`/updateText/${id}/${newText}`)
      .then(function(response) {
        e.target.parentNode.innerHTML = newText;
        setBodyEventListeners();
      })
      .catch(function(error) {
        console.log(error);
      });
  });
}
