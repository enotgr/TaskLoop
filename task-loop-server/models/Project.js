const mongoose = require('mongoose');
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
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tasks'
    }
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ]
});

module.exports = mongoose.model('projects', projectSchema);
