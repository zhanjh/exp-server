const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({echo: 'contact index'});
});
router.get('/list', (req, res, next) => {
  res.json({echo: 'list contacts'});
});
router.get('/filter', (req, res, next) => {
  res.json({echo: 'filter contacts'});
});
router.get('/fetch', (req, res, next) => {
  res.json({echo:'fetch contact detail'});
});

module.exports = router;
