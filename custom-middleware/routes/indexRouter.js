const express = require('express');

const router = express.Router();

const authorizationMiddleware = roles => {
  return (req, res, next) => {
    req.roles = roles;
    next();
  };
};

const isAuthenticated = (req, res, next) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ');
  if (token[0] !== 'Bearer' || token[1] !== `this_is_a_bearer_token`) {
    res.status(401).json({
      error: 'Not authorized!'
    });
  } else {
    next();
  }
};

router.route('/').get(isAuthenticated, (req, res, next) => {
  res.status(200).json({
    msg: `This path is allowed for everyone!`
  });
});

router.route('/login').post((req, res, next) => {
  res.status(200).json({
    token: `this_is_a_bearer_token`,
    msg: 'This is a public path'
  });
});

module.exports = router;
