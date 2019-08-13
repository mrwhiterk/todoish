const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const seedDB = require('./seeds');

const Todo = require('./models/todo');
const todoRoutes = require('./routes/todos');

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASEURL || 'mongodb://localhost:27017/todoish', {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('connected to DB!');
  })
  .catch(err => console.log('error: ', err.message));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
// seedDB();

app.use('/', todoRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on ${PORT} port!`);
});
