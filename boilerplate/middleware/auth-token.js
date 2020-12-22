const jwt = require('jsonwebtoken');
const AccountModel = require('../models/accountModel');
const { handleError, ErrorHandler } = require('../helpers/error');


exports.checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
          error: true,
          data: null,
        });
      }
      AccountModel.findByUserId(decoded._id, (findErr, account) => {
        if (!account || findErr) return handleError(new ErrorHandler(403, 'Your token does not belong to an account'), res);
        req.requester = account._id.toString();
        next();
      });
    });
  } else {
    return res.status(401).json({
      error: true,
      message: 'Auth token is not supplied',
      data: null,
    });
  }
};

exports.checkPresence = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
          error: true,
          data: null,
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      error: true,
      message: 'Auth token is not supplied',
      data: null,
    });
  }
};
