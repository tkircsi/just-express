const expreess = require('express');
const responsetime = require('response-time');

const app = expreess();

app.use(
  responsetime((req, res, time) => {
    const log = `${req.method} - ${req.originalUrl} - ${time}ms`;
    console.log(log);
  })
);

app.use('/a', (req, res, next) => {
  res.send('<h1>Hello Express</h1>');
});

app.all('*', (req, res, next) => {
  res.send('<h4>HomePage</h4>');
});

app.listen(3999, () => {
  console.log('App listening on port 3999!');
});
