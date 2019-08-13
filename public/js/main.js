let todoBodies = document.querySelectorAll('.todo');

[...todoBodies].forEach(todoBody => {
  todoBody.addEventListener('click', editTextMode);
});

function editTextMode(e) {
  e.target.removeEventListener('click', editTextMode);

  let id = e.target.querySelector('#todoId').value;

  let todoText = e.target.innerText;
  e.target.innerHTML = `<input id='editForm' type='text' value='${todoText}' />`;

  let editForm = document.querySelector('#editForm');

  editForm.addEventListener('blur', e => {
    let newText = e.target.value;

    axios
      .post(`/updateText/${id}/${newText}`)
      .then(function(response) {
        e.target.parentNode.innerHTML = response.data.body;
        location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  });
}
