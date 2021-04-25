const User = require('../models/User');

module.exports.get = async function (req, res) {
  const errorMessage = {
    message: 'User authentication error.',
  };

  if (!req.user || !req.user.id) {
    res.status(401).json(errorMessage);
    return;
  }

  const userId = req.user.id;
  const user = await User.findById(userId);

  if (!user) {
    res.status(401).json(errorMessage);
    return;
  }

  res.status(200).json(user);
};
