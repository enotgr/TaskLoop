const mongoose = require('mongoose');
const TaskStatus = require('../shared/enums/task-status-enum');
const TaskPriority = require('../shared/enums/task-priority-enum');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  priority: {
    type: TaskPriority,
    required: true
  },
  status: {
    type: TaskStatus,
    default: TaskStatus.Todo
  },
  description: {
    type: String,
    default: ''
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  performer: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  tags: [
    {
      type: String,
      default: ''
    }
  ],
  parent: {
    ref: 'tasks',
    type: Schema.Types.ObjectId
  },
  subtasks: [
    {
      ref: 'tasks',
      type: Schema.Types.ObjectId
    }
  ]
});

module.exports = mongoose.model('tasks', taskSchema);
