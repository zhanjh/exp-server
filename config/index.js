module.exports = require('../src/fun/deepMerge')(
  require('./config'),
  require('./config.local')
);
