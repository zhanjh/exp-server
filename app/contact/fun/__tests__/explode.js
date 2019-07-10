const explode = require('../explode');

test('explode', () => {
  expect(explode('abc, Def, fgh').sort())
    .toStrictEqual(['abc', 'Def', 'fgh'].sort());
});
