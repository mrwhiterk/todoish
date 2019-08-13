const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      console.log(err);
    } else {
      let newArr = [];
      todos.forEach(item => {
        if (item.complete) {
          newArr.push(item);
        } else {
          newArr.unshift(item);
        }
      });
      res.render('index', { todos: newArr });
    }
  });
});

router.post('/', (req, res) => {
  let newTodo = req.body;
  newTodo.date = new Date().toDateString();
  newTodo.complete = false;
  if (newTodo.body) {
    Todo.create(req.body, (err, newTodo) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
});

router.post('/updateText/:id/:text', (req, res) => {
  let { id, text } = req.params;
  Todo.findById(id, (err, todo) => {
    todo.body = text;

    Todo.findByIdAndUpdate(id, todo, (err, updateTodo) => {
      if (err) {
        console.log(err);
      } else {
        console.log('todo updated');
        res.redirect('/');
      }
    });
  });
});

router.put('/updateComplete/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    todo.complete = !todo.complete;

    Todo.findByIdAndUpdate(req.params.id, todo, (err, updateTodo) => {
      if (err) {
        console.log(err);
      } else {
        console.log('todo updated');
      }
    });
    res.redirect('/');
  });
});

router.delete('/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, removedTodo) => {
    if (err) {
      console.log(err);
    } else {
      console.log('removed ' + removedTodo);
    }
    res.redirect('/');
  });
});

module.exports = router;
