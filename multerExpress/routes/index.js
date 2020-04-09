var express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads');
  },
  filename: function (req, file, cb) {
    const filename = `${file.fieldname}-${Date.now()}.${
      file.mimetype.split('/')[1]
    }`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'MulterExpress' });
});

router.post('/formsub', upload.single('meme'), (req, res, next) => {
  res.json({
    field: req.body,
    file: req.file,
  });
});

module.exports = router;
