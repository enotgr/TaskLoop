const Company = require("../models/Company");
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

  const company = new Company({
    name: req.body.name,
    creator: req.user.id,
    projects: [],
    users: [req.user.id],
  });

  try {
    await company.save();

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

    res.status(200).json({
      message: "Company deleted.",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.update = async function (req, res) {};
