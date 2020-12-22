const parsePagination = (req, res, next) => {
  req.limit = Number(req.query.limit);
  req.offset = Number(req.query.offset);

  delete req.query.limit;
  delete req.query.offset;
  return next();
};

const parseFilter = (req, res, next) => {
  const sortBy = (req.query.sort_by) ? req.query.sort_by.split('.') : [];
  [req.sort_by_field = 'creationDate', req.sort_by_direction = 'desc'] = sortBy;
  req.sort_by_direction = (req.sort_by_direction === 'desc') ? '-' : '+';
  delete req.query.sort_by;
  return next();
};
const parsePopulate = (req, res, next) => {
  req.populate = req.query.populate;
  delete req.query.populate;
  return next();
};

module.exports = {
  parsePagination,
  parseFilter,
  parsePopulate,
};
