let todoBodies = document.querySelectorAll('.todo');

[...todoBodies].forEach((todoBody, index) => {
  todoBody.onclick = editTextMode;
  todoBody.id = index;
});

function editTextMode(e) {
  let todoText = e.target.innerText;
  let id = e.target.id;
  e.target.innerHTML = `<input id='editForm' type='text' value='${todoText}' />`;

  let url = '/updateText/1';

  let editForm = document.querySelector('#editForm');
  editForm.addEventListener('blur', e => {
    fetch(url, {
      id,
      method: 'POST',
      body: e.target.value
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  });
}
