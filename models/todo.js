const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  body: String,
  Complete: Boolean,
  date: String
});

module.exports = mongoose.model('Todo', todoSchema);
