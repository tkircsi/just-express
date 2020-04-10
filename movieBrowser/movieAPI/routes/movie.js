const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asynchandler');

const movies = require('../data/movies');
const movieDetails = require('../data/movieDetails');

const requireJSON = asyncHandler(async (req, res, next) => {
  if (!req.is('application/json')) {
    res.status(400).send('Content type must be JSON!');
  } else {
    next();
  }
});

// @desc    Get movie
// @route   GET /api/movie
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: 'movie route',
    });
  })
);

router.get(
  '/now_playing',
  asyncHandler(async (req, res, next) => {
    let page = req.query.page;
    if (!page) page = 1;
    const page_size = 40;

    const popular = movies.filter((item) => item.most_popular);
    res.status(200).json({
      success: true,
      results: popular.slice((page - 1) * page_size, page * page_size),
    });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const movie = movieDetails.find((item) => String(item.id) === id);
    if (!movie) {
      res.status(404).json({
        success: true,
      });
    }
    res.status(200).json(movie);
  })
);

router.post(
  '/:id/rating',
  requireJSON,
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const value = req.body.value;
    if (value < 0.5 || value > 10) {
      res.status(200).json({
        success: true,
        msg: `Rating value must be between 0.5 and 10.`,
      });
    } else {
      res.status(200).json({
        success: true,
        msg: `Than you for rating movie id: ${id}. Your rate is ${value}`,
      });
    }
  })
);

router.delete(
  '/:id/rating',
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
      success: true,
      msg: `Your rating of movie id: ${id} is deleted.`,
    });
  })
);

module.exports = router;
