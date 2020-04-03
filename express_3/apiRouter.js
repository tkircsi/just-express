const express = require('express');
let router = express.Router();

const authValidator = (req, res, next) => {
  res.locals.validated = true;
  console.log('validated');
  next();
};

router.use(authValidator);

router.get('/', (req, res, next) => {
  res.send('Api Router works');
});

module.exports = router;
