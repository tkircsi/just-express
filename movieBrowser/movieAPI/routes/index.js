const express = require('express');
const router = express.Router();

// @desc    Get popular movies
// @route   GET /api
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      msg: 'Welcome @ movieAPI!'
    });
  } catch (err) {
    res.status(500).json({
      success: false
    });
  }
});

module.exports = router;
