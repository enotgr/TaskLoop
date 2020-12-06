const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  creator: {
    ref: "users",
    type: Schema.Types.ObjectId,
  },
  tasks: [
    {
      ref: "tasks",
      type: Schema.Types.ObjectId,
    },
  ],
  users: [
    {
      ref: "users",
      type: Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model("projects", projectSchema);
