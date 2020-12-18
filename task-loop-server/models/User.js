const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
