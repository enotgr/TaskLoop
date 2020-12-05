const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  company: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
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
