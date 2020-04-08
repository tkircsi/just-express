const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asynchandler');

// @desc    Get popular movies
// @route   GET /api
// @access  Public
router.get('/',  asyncHandler(async (req, res, next)) => {
    res.status(200).json({
      success: true,
      msg: 'Welcome @ movieAPI!'
    });
});

module.exports = router;
