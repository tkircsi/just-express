const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');

const PORT = process.env.PORT || 3999;
const app = express();
const users = require('./routes/users');

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/user', users);

app.use('/', (req, res, next) => {
  res.send('Health check!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
