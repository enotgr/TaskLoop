const mongoose = require('mongoose');
const TaskStatus = require('../shared/enums/task-status-enum');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tasks'
    }
  ]
});

module.exports = mongoose.model('projects', projectSchema);
