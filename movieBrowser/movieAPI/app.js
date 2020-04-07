const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const indexRouter = require('./routes/index');
const movieRouter = require('./routes/movie');
const searchRouter = require('./routes/search');

const app = express();

app.use(helmet());
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Checking for TOKEN
app.use((req, res, next) => {
  try {
    const token_string = req.headers['authorization'];
    const [bearer, token] = token_string.split(' ');
    if (bearer !== 'Bearer' || token !== 'Local_Bearer_Token')
      throw new Error();
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: 'Invalid token!'
    });
  }
});

app.use('/api', indexRouter);
app.use('/api/movie', movieRouter);
app.use('/api/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
