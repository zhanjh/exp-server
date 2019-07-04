const config = require('../config')();
const mysql = require('mysql2/promise');

const db = {
  conn: () => {
    return mysql.createConnection(config.mysql);
  },
};

module.exports = db;
