const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'projects'
    }
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ]
});

module.exports = mongoose.model('companies', companySchema);
