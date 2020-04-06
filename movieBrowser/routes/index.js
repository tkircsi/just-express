const express = require('express');
const router = express.Router();
const axios = require('axios');

router.use((req, res, next) => {
  res.locals.imageUrl = process.env.TMDB_IMAGE_URL;
  next();
});

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const resp = await axios.get(
      process.env.TMDB_BASE_URL + '/movie/now_playing'
    );
    // res.json(resp.data);
    res.render('index', {
      parsedData: resp.data.results
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error!');
  }
});

router.get('/movie/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await axios.get(process.env.TMDB_BASE_URL + '/movie/' + id);
    // res.json(resp.data);
    res.render('single-movie', {
      parsedData: resp.data
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error!');
  }
});

module.exports = router;
