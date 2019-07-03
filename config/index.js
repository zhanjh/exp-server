const configSingleton = require('../fun/deepMerge')(
  require('./config'),
  require('./config.local')
);

module.exports = () => {
  return configSingleton;
};
