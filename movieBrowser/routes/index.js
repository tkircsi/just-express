const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

router.use((req, res, next) => {
  res.locals.imageUrl = process.env.IMAGE_URL;
  next();
});

router.get('/login', passport.authenticate('github'));

router.get(
  '/auth',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/loginfailed'
  })
);

/* GET home page. */
router.get('/', async (req, res, next) => {
  // console.log(req.user.displayName);
  try {
    const resp = await axios.get(process.env.BASE_URL + '/movie/now_playing');
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
    const resp = await axios.get(process.env.BASE_URL + '/movie/' + id);
    // res.json(resp.data);
    res.render('single-movie', {
      parsedData: resp.data
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error!');
  }
});

router.post('/search', async (req, res, next) => {
  try {
    const { cat, movieSearch } = req.body;
    const url =
      process.env.BASE_URL +
      '/search/' +
      cat +
      '?query=' +
      encodeURIComponent(movieSearch);
    const resp = await axios.get(url);
    let parsedData = [];
    if (cat == 'movie') {
      parsedData = resp.data.results;
    } else if (cat == 'person') {
      parsedData = resp.data.results[0].known_for;
    }
    // res.json(resp.data);
    res.render('index', {
      parsedData
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error!');
  }
});

module.exports = router;
