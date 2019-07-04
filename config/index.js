const configSingleton = require('../lib/deepMerge')(
  require('./config'),
  require('./config.local')
);

module.exports = () => {
  return configSingleton;
};
