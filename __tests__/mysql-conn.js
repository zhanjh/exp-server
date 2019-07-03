test('MySQL Connection', () => {
  const config = require('../config');
  const mysql = require('mysql');
  const conn = mysql.createConnection(config.mysql);

  conn.connect();
  conn.query('SELECT 1', (err, results, fields) => {
    expect(err).toBeNull();
  });
  conn.end();
});

/*
const mysql = require('mysql');
const conn = mysql.createConnection(config.db);

conn.connect();

conn.query(
  'SELECT * FROM Contact LIMIT 10',
  (err, results, fields) => {
    console.log(err, results, fields);
  }
);
conn.end();
*/

