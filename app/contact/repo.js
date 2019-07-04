const sqlBuilder = require('./sql-builder');
const db = require('../../db');
const Contact = require('./entity/Contact.class');

module.exports = {
  list: async (offset, limit, asc, desc) => {
    const [sql, params] = sqlBuilder.buildListQuery(offset, limit, asc, desc);
    const conn = await db.conn();
    console.log(sql, params);
    const [rows, fields] = await conn.execute(sql, params);
    const contacts = rows.map(row => new Contact(row));
    await conn.end();

    return contacts;
  },

  filter: async (keyword, offset, limit, asc, desc) => {
    const [sql, params] = sqlBuilder.buildFilterQuery(keyword, offset, limit, asc, desc);
    const conn = await db.conn();
    console.log(sql, params);
    const [rows, fields] = await conn.execute(sql, params);
    const contacts = rows.map(row => new Contact(row));
    await conn.end();

    return contacts;
  }
};
