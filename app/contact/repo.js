const sqlBuilder = require('./sql-builder');
const db = require('../../db');
const Contact = require('./entity/Contact.class');
const ContactDetail = require('./entity/ContactDetail.class');
const logger = require('../../lib/logger');

module.exports = {
  list: async (offset, limit, asc, desc) => {
    const [sql, params] = sqlBuilder.buildListQuery(offset, limit, asc, desc);
    logger.info(sql, params);

    const conn = await db.conn();

    const [rows, ] = await conn.execute(sql, params);
    const contacts = rows.map(row => new Contact(row));
    await conn.end();

    return contacts;
  },

  countList: async () => {
    const [sql, params] = sqlBuilder.countListQuery();
    logger.info(sql, params);

    const conn = await db.conn();
    const [rows, ] = await conn.execute(sql, params);
    return parseInt(rows[0]['total']);
  },

  filter: async (keyword, offset, limit, asc, desc) => {
    const [sql, params] = sqlBuilder.buildFilterQuery(keyword, offset, limit, asc, desc);
    logger.info(sql, params);

    const conn = await db.conn();
    const [rows, ] = await conn.execute(sql, params);
    const contacts = rows.map(row => new Contact(row));
    await conn.end();

    return contacts;
  },

  countFilter: async (keyword) => {
    const [sql, params] = sqlBuilder.countFilterQuery(keyword);
    logger.info(sql, params);

    const conn = await db.conn();
    const [rows, ] = await conn.execute(sql, params);
    return parseInt(rows[0]['total']);
  },

  fetch: async (userID) => {
    const conn = await db.conn();

    const [sql, params] = sqlBuilder.buildFetchQuery(userID);
    logger.info(sql, params);

    const [rows, ] = await conn.execute(sql, params);
    if (rows.length < 1) {
      return null;
    }
    const contact = new Contact(rows[0]);

    const [detailsSql, detailsParams] = sqlBuilder.buildDetailsQuery(userID);
    logger.info(detailsSql, detailsParams);

    const [detailsRows, ] = await conn.execute(detailsSql, detailsParams);
    const details = detailsRows.map(detail => new ContactDetail(detail));

    contact.setDetails(details);

    await conn.end();

    return contact;
  }
};
