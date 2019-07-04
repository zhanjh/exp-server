const express = require('express');
const ctrl = require('./ctrl');

const router = express.Router();
router.get('/', ctrl.index);
router.get('/list', ctrl.list);
router.get('/filter', ctrl.filter);
router.get('/fetch', ctrl.fetch);

/*
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
*/

module.exports = router;
