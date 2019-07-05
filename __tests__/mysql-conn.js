test('MySQL Connection', async () => {
  const db = require('../db');
  const conn = await db.conn();
  const [rows, ] = await conn.execute('SELECT :x+:y as sum', {x: 21, y: 7});
  expect(rows[0]['sum']).toBe(28);
  await conn.end();
});
