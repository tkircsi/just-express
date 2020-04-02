const path = require('path');
const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const showScript = `<script>
function show() {
  alert("Hello!");
}
</script>`;

function validateUser(req, res, next) {
  res.locals.validated = true;
  next();
}

app.use(validateUser);

app.get('/', (req, res) => {
  res.render('index', {
    msg: 'Success',
    showScript
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
