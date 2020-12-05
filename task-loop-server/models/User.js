const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'projects'
    }
  ],
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('users', userSchema);
