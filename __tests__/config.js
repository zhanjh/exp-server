describe('Config setup', () => {
  test('Should load mysql config', () => {
    const config = require('../config')();
    expect(Object.prototype.hasOwnProperty.call(config, 'mysql')).toBe(true);

    const localConfig = require('../config/config.local');
    expect(config.mysql.user).toBe(localConfig.mysql.user);
  });
});
