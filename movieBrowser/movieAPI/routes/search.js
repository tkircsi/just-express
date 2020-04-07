const express = require('express');
const router = express.Router();

const movies = require('../data/movies');
const people = require('../data/people');

const requiredQuery = async (req, res, next) => {
  const query = req.query.query;
  if (!query) {
    res.status(400).json({
      success: false,
      error: 'Query is required.'
    });
  } else {
    next();
  }
};

router.use(requiredQuery);

// @desc    Search for a movie
// @route   GET /api/search
// @access  Public
router.get('/movie', async (req, res, next) => {
  try {
    const query = req.query.query;
    const results = movies.filter(movie => {
      let found = false;
      found = movie.overview.includes(query) || movie.title.includes(query);
      return found;
    });
    res.status(200).json({
      success: true,
      results
    });
  } catch (err) {
    res.status(500).json({
      success: false
    });
  }
});

// @desc    Search for a person
// @route   GET /api/search
// @access  Public
router.get('/person', async (req, res, next) => {
  try {
    const query = req.query.query;
    const results = people.filter(person => {
      let found = false;
      found = person.name.includes(query);
      return found;
    });
    res.status(200).json({
      success: true,
      results
    });
  } catch (err) {
    res.status(500).json({
      success: false
    });
  }
});

module.exports = router;
