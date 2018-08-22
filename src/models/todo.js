const mongoose = require('mongoose')


const todoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: {type: String, required: true},
  completed: {type: Number, required: true},
  created: {
    type: Date,
    default: Date.now
  },
  last_updated: {
    type: Date,
    default: Date.now
  }

}, {
  autoIndex: true
});

module.exports = mongoose.model('todo', todoSchema);
