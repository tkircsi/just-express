const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/ajax', (req, res) => {
  console.log(req.body);
  res.send(req.body.name);
});

app.post('/delayed', async (req, res) => {
  await sleep(req.body.time);
  res.send(`Delayed for ${req.body.time}ms.`);
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

function sleep(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve('done'), time);
  });
}
