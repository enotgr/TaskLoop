const User = require('../models/User');
const errorHandler = require('../shared/utils/errorHandler');

module.exports.getAll = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user.projects);
  } catch (error) {
    errorHandler(res, error);
  }
};

// module.exports.update = async function (req, res) {};
