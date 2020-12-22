const fs = require('fs-extra');
const {{ ressourceNameWithMaj }} = require('../models/{{ ressourceName }}Model');
const { handleError, ErrorHandler } = require('../helpers/error');

const get{{ ressourceNameWithMaj }} = (req, res) => {
  {{ ressourceNameWithMaj }}.find(req.query).skip(req.offset).limit(req.limit)
    .sort(req.sort_by_direction + req.sort_by_field)
    .populate(req.populate)
    .exec((findErr, {{ ressourceName }}s) => {
      if (findErr) throw new ErrorHandler(400, findErr.message);
      return res.json({ data: {{ ressourceName }}s, error: false });
    });
};

const get{{ ressourceNameWithMaj }}ById = (req, res) => {
  {{ ressourceNameWithMaj }}.findById(req.params.id, (findErr, {{ ressourceName }}) => {
    if (findErr) return handleError(new ErrorHandler(400, findErr.message), res);
    return res.json({ data: {{ ressourceName }}, error: false });
  });
};


const create{{ ressourceNameWithMaj }} = (req, res) => {
  const new{{ ressourceNameWithMaj }} = new {{ ressourceNameWithMaj }}(req.body);
  new{{ ressourceNameWithMaj }}.save((err) => {
    if (err) return handleError(new ErrorHandler(400, err), res);
    return res.json({ data: new{{ ressourceNameWithMaj }}, error: false, message: 'Successfully saved' });
  });
};

const update{{ ressourceNameWithMaj }} = (req, res) => {
  {{ ressourceNameWithMaj }}.findById(req.params.id, (findErr, {{ ressourceName }}) => {
    if (!{{ ressourceName }}) return handleError(new ErrorHandler(404, '{{ ressourceNameWithMaj }} not found'), res);
    if (findErr) return handleError(new ErrorHandler(400, findErr.message), res);


    Object.assign({{ ressourceName }}, req.body);
    {{ ressourceName }}.save((saveErr) => {
      if (saveErr) return handleError(new ErrorHandler(400, saveErr), res);
     
      return res.json({ data: {{ ressourceName }}, error: false, message: 'Successfully saved' });
    });
  });
};

const delete{{ ressourceNameWithMaj }} = (req, res) => {
  {{ ressourceNameWithMaj }}.findById(req.params.id, ((findErr, {{ ressourceName }}) => {
    if (!{{ ressourceName }}) return handleError(new ErrorHandler(404, '{{ ressourceNameWithMaj }} not found'), res);
    if (findErr) return handleError(new ErrorHandler(400, findErr.message), res);

    {{ ressourceName }}.remove((removeErr, removedDevlog) => {
      if (removeErr) return handleError(new ErrorHandler(400, removeErr.message), res);
      return res.json({ data: removedDevlog, error: false, message: 'Successfully deleted' });
    });
  }));
};

const search{{ ressourceNameWithMaj }} = (req, res) => {
  {{ ressourceNameWithMaj }}.find({ $text: { $search: req.body.data } }).skip(req.offset).limit(req.limit)
    .sort(req.sort_by_direction + req.sort_by_field)
    .populate(req.populate)
    .exec((findErr, {{ ressourceName }}s) => {
      if (findErr) throw new ErrorHandler(400, findErr.message);
      return res.json({ data: {{ ressourceName }}s, error: false });
    });
};

module.exports = {
  create{{ ressourceNameWithMaj }},
  get{{ ressourceNameWithMaj }},
  get{{ ressourceNameWithMaj }}ById,
  delete{{ ressourceNameWithMaj }},
  update{{ ressourceNameWithMaj }},
  search{{ ressourceNameWithMaj }},
};
