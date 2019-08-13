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
router.get('/sortAlpha', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      console.log(err);
    } else {
      todos.sort((a, b) => (a.body > b.body ? 1 : -1));
      res.render('index', { todos });
    }
  });
});
router.get('/sortAlphaReverse', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      console.log(err);
    } else {
      todos.sort((a, b) => (a.body < b.body ? 1 : -1));
      res.render('index', { todos });
    }
  });
});
router.get('/completeSort', (req, res) => {
  Todo.find({ complete: true }, (err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { todos });
    }
  });
});
router.get('/incompleteSort', (req, res) => {
  Todo.find({ complete: false }, (err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { todos });
    }
  });
});

router.post('/search', (req, res) => {
  let { searchTerm } = req.body;
  let regex = new RegExp(searchTerm);

  Todo.find({ body: regex }, (err, todos) => {
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
