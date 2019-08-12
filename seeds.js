const mongoose = require('mongoose');
const Todo = require('./models/todo');

const data = [
  {
    body: 'walk the dog',
    complete: false,
    date: 'Mon Aug 12 2019'
  },
  {
    body: 'skin the cat',
    complete: false,
    date: 'Mon Jan 10 2019'
  },
  {
    body: 'walk the dog',
    complete: false,
    date: 'Tue Oct 14 2015'
  }
];

function seedDB() {
  Todo.deleteMany({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('removed todos\v');

      data.forEach(seed => {
        Todo.create(seed, (err, todo) => {
          if (err) {
            console.log(err);
          } else {
            console.log('added a todo');
          }
        });
      });
    }
  });
}

module.exports = seedDB;
