const sqlBuilder = require('./sql-builder');
const db = require('../../db');
const Contact = require('./entity/Contact.class');
const ContactDetail = require('./entity/ContactDetail.class');

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
  },

  fetch: async (userID) => {
    const conn = await db.conn();

    const [sql, params] = sqlBuilder.buildFetchQuery(userID);
    const [rows, fields] = await conn.execute(sql, params);
    if (rows.length < 1) {
      return null;
    }
    const contact = new Contact(rows[0]);

    const [detailsSql, detailsParams] = sqlBuilder.buildDetailsQuery(userID);
    const [detailsRows, detailsFields] = await conn.execute(detailsSql, detailsParams);
    const details = detailsRows.map(detail => new ContactDetail(detail));

    contact.setDetails(details);

    await conn.end();

    return contact;
  }
};
