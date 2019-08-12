const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      console.log(err);
    } else {
      console.log(todos);
      res.render('index', { todos: todos });
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

module.exports = router;
