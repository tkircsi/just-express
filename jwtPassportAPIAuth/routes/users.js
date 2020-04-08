const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Users = require('../db/Users');
const bcrypt = require('bcryptjs');
const { jwt_secret } = require('../config/config');

const router = express.Router();

router.post('/register', (req, res, next) => {
  try {
    const { name, email, username, password } = req.body;
    const user = Users.find(username);
    if (user) {
      res.status(400).json({
        success: false,
        msg: 'User already exists!'
      });
    } else {
      Users.add(name, email, username, password);
      res.status(200).json({
        success: true,
        msg: 'User registered.'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message
    });
  }
});

router.use('/auth', (req, res, next) => {
  const { username, password } = req.body;
  const user = Users.find(username);
  if (!user) {
    return res.status(404).json({
      success: false,
      msg: 'User not found!'
    });
  }

  Users.comparePassword(password, user.password, (err, isMatch) => {
    if (err) throw err;
    if (isMatch) {
      delete user.password;
      const token = jwt.sign(user, jwt_secret, {
        expiresIn: 604800
      });

      res.status(200).json({
        success: true,
        token: `JWT ${token}`,
        user
      });
    } else {
      res.status(403).json({
        success: false,
        msg: 'Invalid credentials!'
      });
    }
  });
});

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.status(200).json({
      success: true,
      user: req.user
    });
  }
);

router.use('/', (req, res, next) => {
  res.status(200).json({
    users: Users.getUsers()
  });
});

module.exports = router;
