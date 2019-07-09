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
  index: (req, res) => {
    res.json({echo: 'contact index'});
  },
  list: async (req, res) => {

    const offset = req.query['offset'];
    const limit = req.query['limit'];
    const asc = parseFields(req.query['asc']);
    const desc = parseFields(req.query['desc']);
    const contacts = await repo.list(offset, limit, asc, desc);
    const total  = await repo.countList();
    res.json({total, contacts});
  },

  filter: async (req, res) => {
    const keyword = req.query['keyword'];
    const offset = req.query['offset'];
    const limit = req.query['limit'];
    const asc = parseFields(req.query['asc']);
    const desc = parseFields(req.query['desc']);

    const contacts = await repo.filter(keyword, offset, limit, asc, desc);
    const total  = await repo.countFilter(keyword);
    res.json({total, contacts});
  },
  fetch: async (req, res) => {
    const userID = req.query['userID'];
    const contact = await repo.fetch(userID);

    res.json(contact);
  },
  total: async (req, res) => {
    // todo
    res.json({total: 1000});
  }
};
