const Company = require("../models/Company");
const User = require("../models/User");
const UserPermissionEnum = require("../shared/enums/user-permission-enum");
const errorHandler = require("../shared/utils/errorHandler");

module.exports.getById = async function (req, res) {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json(company);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.create = async function (req, res) {
  const companyCandidate = await Company.findOne({ name: req.body.name });

  if (companyCandidate) {
    res.status(409).json({
      message: "This company name is already taken.",
    });
    return;
  }

  const userId = req.user.id;

  if (!userId) {
    errorHandler(res, { message: "Unknown token error." });
    return;
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ message: "User is not found." });
    return;
  }

  if (user.permission === UserPermissionEnum.Company) {
    res.status(406).json({ message: "The user already has a company." });
    return;
  }

  const company = new Company({
    name: req.body.name,
    creator: userId,
    projects: [],
    users: [userId],
  });

  try {
    const companyObj = await company.save();
    user.set("permission", UserPermissionEnum.Company);
    user.set("company", companyObj.id);
    await user.save();
    res.status(201).json(company);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.remove = async function (req, res) {
  // TODO: check user permission

  try {
    await Company.remove({
      _id: req.params.id,
    });

    // TODO: remove users
    // TODO: change user permission on "user"

    res.status(200).json({
      message: "Company deleted.",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.update = async function (req, res) {};
