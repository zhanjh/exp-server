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
  //throw new Error('parseFields: unknown input format ');
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
  filter: (req, res, next) => {
    res.json({echo: 'filter contacts'});
  },
  fetch: (req, res, next) => {
    res.json({echo:'fetch contact detail'});
  },
};
