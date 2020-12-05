const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const authConfig = require("../shared/configs/auth.config");
const Company = require("../models/Company");
const User = require("../models/User");

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (!candidate) {
    res.status(404).json({
      message: "User with this email address not found",
    });

    return;
  }

  passwordInput = req.body.password;
  const isPasswordMatch = bcrypt.compareSync(passwordInput, candidate.password);

  if (!isPasswordMatch) {
    res.status(401).json({
      message: "Passwords do not match",
    });

    return;
  }

  const token = jsonwebtoken.sign(
    {
      email: candidate.email,
      userId: candidate._id,
    },
    authConfig.login.jwt,
    { expiresIn: 3600 }
  );

  res.status(200).json({ token: `Bearer ${token}` });
};

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    res.status(409).json({
      message: "This email address is already taken",
    });

    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const password = req.body.password;

  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(password, salt),
  });

  const company = new Company({
    name: req.body.company,
    creator: user._id,
    users: [user._id],
  });

  try {
    await user.save();
    await company.save();

    res.status(201).json({ company, user });
  } catch (error) {
    //
  }
};
