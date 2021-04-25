const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  taskStatuses: [
    {
      type: String,
      default: null,
    },
  ],
  description: {
    type: String,
    default: null,
  },
  creator: {
    ref: 'users',
    type: Schema.Types.ObjectId,
  },
  tasks: [
    {
      ref: 'tasks',
      type: Schema.Types.ObjectId,
    },
  ],
  users: [
    {
      ref: 'users',
      type: Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model('projects', projectSchema);
