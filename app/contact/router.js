const express = require('express');
const ctrl = require('./ctrl');

const router = express.Router();
router.get('/', ctrl.index);
router.get('/list', ctrl.list);
router.get('/filter', ctrl.filter);
router.get('/fetch', ctrl.fetch);

module.exports = router;
