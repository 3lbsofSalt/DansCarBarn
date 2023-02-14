import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/';
import safeAwait from 'safe-await';

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// This is just for temporary use

console.log('barf')
const secretKey = process.env.JWT_KEY;
async function makeJWT(payload) {
  return jwt.sign(payload, secretKey);
}

async function decodeJWT(token) {
  return jwt.verify(token, secretKey);
}

function retrieveBearerToken(req) {
  const bearer = req.get('Authorization');
  return bearer.split(' ')[1];
}

const isLoggedIn = async (req, res, next) => {
  const [decodeError, payload] = await safeAwait(decodeJWT(retrieveBearerToken(req)));
  if(decodeError) {
    console.log(decodeError);
    return res.sendStatus(401);
  }

  const [error, user] = await safeAwait(models.User.findOne({
    where: { id: payload.id },
    attributes: {
      exclude: ['hash']
    }

  }));

  if(error) {
    console.log(error);
    return res.sendStatus(401);
  }

  req.user = user;
  next();
};

module.exports = {
  hashPassword,
  makeJWT,
  decodeJWT,
  isLoggedIn
};
