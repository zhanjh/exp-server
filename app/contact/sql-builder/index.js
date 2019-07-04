const dbOpts = require('../db-opts');

const availables = dbOpts.contact.availables;

const contactTable = 'ContactSummary';
const contactDetailTable = 'ContactDetail';
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

const buildFieldSegment = () => {
  return Object.values(availables).join(', ');
};

const buildListQuery = (offsetIn, limitIn, ascIn, descIn) => {
  return buildFilterQuery('', offsetIn, limitIn, ascIn, descIn);
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
  }
  if (desc.length > 0) {
    orders.push([descKey, desc.join(', ')]);
  }

  const fieldSeg = buildFieldSegment();
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

const buildDetailsQuery = (userIDIn) => {
  const userID = parseInt(userIDIn);
  const fieldSeg = 'UserID, ContactDetailType, ContactDetailContent';
  const sql = `SELECT ${fieldSeg} FROM ${contactDetailTable} WHERE UserID = :userID`;
  const params = {userID}

  return [
    sql,
    params
  ];
};

const buildFetchQuery = (userIDIn) => {
  const userID = parseInt(userIDIn);
  if (isNaN(userID)) {
    throw new Error('Incorrect userID format');
  }

  const fieldSeg = buildFieldSegment();

  const sql = `SELECT ${fieldSeg} FROM ${contactTable} WHERE UserID = :userID LIMIT 1`;
  return [sql, {userID}];
};

module.exports = {
  buildListQuery: (offset, limit, asc, desc) => {
    return buildListQuery(offset, limit, asc, desc);
  },
  buildFilterQuery: (keywords, offset, limit, asc, desc) => {
    return buildFilterQuery(keywords, offset, limit, asc, desc);
  },
  buildFetchQuery: (userID) => {
    return buildFetchQuery(userID);
  },
  buildDetailsQuery: (userID) => {
    return buildDetailsQuery(userID);
  }
};
