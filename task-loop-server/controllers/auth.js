const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const authConfig = require("../shared/configs/auth.config");
const errorHandler = require("../shared/utils/errorHandler");
const User = require("../models/User");

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (!candidate) {
    res.status(404).json({
      message: "User with this email address not found.",
    });
    return;
  }

  passwordInput = req.body.password;
  const isPasswordMatch = bcrypt.compareSync(passwordInput, candidate.password);

  if (!isPasswordMatch) {
    res.status(401).json({
      message: "Passwords do not match.",
    });
    return;
  }

  const token = createToken(candidate.email, candidate._id);

  res.status(200).json({ token: `Bearer ${token}` });
};

module.exports.register = async function (req, res) {
  const userCandidate = await User.findOne({ email: req.body.email });

  if (userCandidate) {
    res.status(409).json({
      message: "This email address is already taken.",
    });

    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const password = req.body.password;

  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(password, salt),
  });

  try {
    await user.save();

    const token = createToken(req.body.email, user._id);

    res.status(201).json({ token: `Bearer ${token}` });
  } catch (error) {
    errorHandler(res, error);
  }
};

function createToken(email, userId) {
  return jsonwebtoken.sign({ email, userId }, authConfig.login.jwt, {
    expiresIn: 3600,
  });
}
