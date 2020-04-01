const express = require('express');
const app = express();

const formatHost = (req, res, next) => {
  res.locals.formattedHost = req.hostname.toUpperCase();
  next();
};

// app level middlware. used for all request
app.use(formatHost);

// app level, PATH middleware
app.use('/admin', (req, res, next) => {
  console.log('You are on the admin page.');
  next();
});

app.get('/admin', (req, res) => {
  res.append('is-admin', 'true');
  res.send('Admin page.');
});

const userNameHeaderCheck = (req, res, next) => {
  if (!req.headers['user-name']) req.headers['user-name'] = 'Express';
  next();
};

const isValidated = (req, res, next) => {
  res.locals.isValidated = req.headers['user-name'] !== 'Express';
  next();
};

// route level, PATH / and GET middleware
app.get('/', [userNameHeaderCheck, isValidated], (req, res) => {
  const userName = req.headers['user-name'];
  res.send(
    `<h1>Welcome ${userName}!</h1><p>Validated: ${res.locals.isValidated}</p><p>Host: ${res.locals.formattedHost}</p>`
  );
});

app.get('/api/city', (req, res) => {
  res.status(200).json({
    city: 'Budapest'
  });
});

app.listen(3999, () => {
  console.log('App listening on port 3999!');
});
