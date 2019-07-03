module.exports = require('../fun/deepMerge')(
  require('./config'),
  require('./config.local')
);
