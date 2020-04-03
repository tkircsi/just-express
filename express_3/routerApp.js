const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const router = require('./theRouter');
const apiRouter = require('./apiRouter');
app.use('/', router);
// app.use('/admin', adminRouter);
app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
