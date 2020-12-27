const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserPermissionEnum = require("../shared/enums/user-permission-enum");

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
  permission: {
    type: UserPermissionEnum,
    default: UserPermissionEnum.User,
  },
  projects: [
    {
      ref: "projects",
      type: Schema.Types.ObjectId,
    },
  ],
  tasks: [
    {
      ref: "tasks",
      type: Schema.Types.ObjectId,
    },
  ],
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("users", userSchema);
