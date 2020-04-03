const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('cookie-secret-sign'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  if (req.query.msg === 'fail') {
    res.locals.msg = 'Invalid credentials!';
  } else {
    res.locals.msg = '';
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Health check!');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/process_login', (req, res) => {
  const { username, password } = req.body;
  if (password === '123') {
    res.cookie('username', username, { httpOnly: true });
    res.redirect('/welcome');
  } else {
    res.redirect('/login?msg=fail');
  }
});

app.get('/welcome', (req, res) => {
  res.render('welcome', {
    username: req.cookies.username
  });
});

app.get('/story/:id', (req, res) => {
  const id = req.params.id;
  res.send(id);
});

// always RUN BEFORE ROUTES
app.param('id', (req, res, next, id) => {
  if ('123'.split('').includes(id, 0)) {
    req.params.id = `Story ${id}`;
    next();
  } else {
    res.send('Invalid parameter!');
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
