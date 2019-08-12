const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { todos });
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
