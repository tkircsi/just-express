const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 3999;

const indexRouter = require('./routes/indexRouter');

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
