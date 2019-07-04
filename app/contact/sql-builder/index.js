const dbOpts = require('../db-opts');

const availables = dbOpts.contact.availables;

const contactTable = 'ContactSummary';
const descKey = 'DESC';
const ascKey = 'ASC';

const defaultOffset = 0;
const defaultLimit = 100;

const filterFields = (fields) => {
  if (!Array.isArray(fields)) {
    return [];
  }

  return fields
    .map(item => item.toLowerCase())
    .filter(item => availables.hasOwnProperty(item))
    .map(item => availables[item])
};

const filterInt = (input, defaultVal = 0) => {
  const parsed = parseInt(input);
  return isNaN(parsed) ? defaultVal : parsed;
};

const buildOrderSegment = (orders) => {
  if (!Array.isArray(orders) || orders.length == 0) {
    return '';
  }
  const sql = orders.map(item => {
      const orderType = item[0].toUpperCase() === descKey ? descKey : ascKey;
      return item[1] + ' ' + orderType;
    })
    .join(' ');

  return 'ORDER BY ' + sql + ' ';
};

const buildWhereSegment = (keyword) => {
  if (keyword === '') {
    return ['', {}];
  }

  return [
    'WHERE Name LIKE :keyword ',
    {keyword: `%${keyword}%`}
  ];
};

const buildListQuery = (offsetIn, limitIn, ascIn, descIn) => {
  return buildFilterQuery('', offsetIn, limitIn, ascIn, descIn);
  /*
  const offset = filterInt(offsetIn, defaultOffset);
  const limit = filterInt(limitIn, defaultLimit);
  const asc = filterFields(ascIn);
  const desc = filterFields(descIn);

  const params = {
    offset,
    limit
  };

  const orders = [];
  const ascAlias = 'asc';
  const descAlias = 'desc';
  if (asc.length > 0) {
    orders.push([ascKey, asc.join(', ')]);
    //params[ascAlias] = asc.join(', ');
  }
  if (desc.length > 0) {
    orders.push([descKey, desc.join(', ')]);
    //params[descAlias] = desc.join(', ');
  }

  const fieldSeg = Object.values(availables).join(', ');
  const orderSeg = buildOrderSegment(orders);

  const sql = `SELECT ${fieldSeg} FROM ${contactTable} ${orderSeg} LIMIT :offset, :limit`;

  return [
    sql,
    params
  ];
  */
};

const buildFilterQuery = (keywordIn, offsetIn, limitIn, ascIn, descIn) => {
  const keyword = keywordIn.trim();

  const offset = filterInt(offsetIn, defaultOffset);
  const limit = filterInt(limitIn, defaultLimit);
  const asc = filterFields(ascIn);
  const desc = filterFields(descIn);

  const params = {
    offset,
    limit
  };

  const orders = [];
  const ascAlias = 'asc';
  const descAlias = 'desc';
  if (asc.length > 0) {
    orders.push([ascKey, asc.join(', ')]);
    //params[ascAlias] = asc.join(', ');
  }
  if (desc.length > 0) {
    orders.push([descKey, desc.join(', ')]);
    //params[descAlias] = desc.join(', ');
  }

  const fieldSeg = Object.values(availables).join(', ');
  const orderSeg = buildOrderSegment(orders);
  const [whereSeg, whereParams] = buildWhereSegment(keyword);

  if (whereSeg !== '') {
    Object.assign(params, whereParams);
  }

  const sql = `SELECT ${fieldSeg} FROM ${contactTable} ${whereSeg}${orderSeg}LIMIT :offset, :limit`;

  return [
    sql,
    params
  ];
};

module.exports = {
  buildListQuery: (offset, limit, asc, desc) => {
    return buildListQuery(offset, limit, asc, desc);
  },
  buildFilterQuery: (keywords, offset, limit, asc, desc) => {
    return buildFilterQuery(keywords, offset, limit, asc, desc);
  },
  buildFetchQuery: (userID) => {
  }
};
