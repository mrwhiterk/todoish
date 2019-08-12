const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  body: String,
  complete: Boolean,
  date: String
});

module.exports = mongoose.model('Todo', todoSchema);
