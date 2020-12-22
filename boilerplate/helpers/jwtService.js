const jwtService = require('jsonwebtoken');


const createBadSignatureToken = payload => jwtService.sign(payload, 'wrongSecret', { expiresIn: '1d' });
const createValidToken = payload => jwtService.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
const createExpiredToken = payload => jwtService.sign(payload, process.env.JWT_SECRET, { expiresIn: '-1d' });

module.exports = {
  createBadSignatureToken,
  createExpiredToken,
  createValidToken,
};
