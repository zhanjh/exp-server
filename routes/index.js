var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Expedia Technical Exercise')
  //res.render('index', { title: 'Express' });
});

router.get('/not-found', (req, res, next) => {
  res.status(404);
  res.json({
    error: 'Not Found'
  });
});

module.exports = router;
