/**
 * Service Layer
 */
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { resolve } = require('path');

const pubKey = fs.readFileSync(resolve('public', 'keys', 'jwt.pub.key'), 'utf8'); // get public key
const pvtKey = fs.readFileSync(resolve('public', 'keys', 'jwt.key'), 'utf8'); // get private key

const createToken = (payload) => jwt.sign(payload, { key: pvtKey, passphrase: 'Rak2020' }, { algorithm: 'RS256' });

const verifyToken = (token) => jwt.verify(token, pubKey, { algorithms: ['RS256'] });


module.exports = {
  createToken,
  verifyToken,
};
