const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPermissionEnum = require('../shared/enums/user-permission-enum');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  company: {
    ref: 'companies',
    type: Schema.Types.ObjectId,
    required: true,
    default: null,
  },
  permission: {
    type: UserPermissionEnum,
    required: true,
    default: UserPermissionEnum.User,
  },
  projects: [
    {
      ref: 'projects',
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
  tasks: [
    {
      ref: 'tasks',
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
  registered: {
    type: Boolean,
    required: true,
    default: false,
  },
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('users', userSchema);
