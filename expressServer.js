const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.all('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/node.html'));
});

app.all('*', (req, res) => {
  res.send('<h4>Hello Express!</h4>');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
