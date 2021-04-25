const express = require('express');
const passport = require('passport');

const controller = require('../controllers/user-profile');
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.get
);

module.exports = router;
