const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('public'));

const whitelist = ['http://localhost:3000', 'http://localhost:3999'];
app.use(
  cors({
    origin: function(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  })
);

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/node.html'));
});

app.get('/api/city', (req, res) => {
  res.status(200).json({
    city: 'Budapest'
  });
});

app.listen(3999, () => {
  console.log('App listening on port 3999!');
});
