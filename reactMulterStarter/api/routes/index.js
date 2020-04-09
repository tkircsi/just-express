const express = require('express');
const router = express.Router();
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

/* G

/* GET home page. */
router.post('/uploadFile', upload.single('meme'), function (req, res, next) {
  console.log('upload');
  res.json(req.file);
});

router.post('/uploadFiles', upload.array('meme', 4), function (req, res, next) {
  res.json(req.files);
});

router.get('/', function (req, res, next) {
  res.json({
    msg: 'Health check',
  });
});

module.exports = router;
