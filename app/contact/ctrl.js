const repo = require('./repo');

const parseFields = (input) => {
  if (typeof input === 'string') {
    return input.split(',').map(item => item.trim());
  }
  if (Array.isArray(input)) {
    return input;
  }

  console.log('parseFields: ', input);
  return [];
};

module.exports = {
  index: (req, res, next) => {
    res.json({echo: 'contact index'});
  },
  list: async (req, res, next) => {

    const offset = req.query['offset'];
    const limit = req.query['limit'];
    const asc = parseFields(req.query['asc']);
    const desc = parseFields(req.query['desc']);
    const contacts = await repo.list(offset, limit, asc, desc);
    res.json(contacts);
  },

  filter: async (req, res, next) => {
    const keyword = req.query['keyword'];
    const offset = req.query['offset'];
    const limit = req.query['limit'];
    const asc = parseFields(req.query['asc']);
    const desc = parseFields(req.query['desc']);

    const contacts = await repo.filter(keyword, offset, limit, asc, desc);
    res.json(contacts);
  },
  fetch: async (req, res, next) => {
    const userID = req.query['userID'];
    const contact = await repo.fetch(userID);

    res.json(contact);
  },
};
