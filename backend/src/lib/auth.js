import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/';
import safeAwait from 'safe-await';

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

const secretKey = process.env.JWT_KEY;
async function makeJWT(payload) {
  return jwt.sign(payload, secretKey);
}

async function decodeJWT(token) {
  return jwt.verify(token, secretKey);
}

function retrieveBearerToken(req) {
  const bearer = req.get('Authorization');
  if (!bearer) return null;

  return bearer.split(' ')[1];
}

const isLoggedIn = async (req, res, next) => {
  const bearerToken = retrieveBearerToken(req);

  if (!bearerToken) return res.sendStatus(401);

  const [decodeError, payload] = await safeAwait(decodeJWT(bearerToken));
  if (decodeError) {
    console.log(decodeError);
    return res.sendStatus(401);
  }

  const [error, user] = await safeAwait(
    models.User.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ['hash'],
      },
    })
  );

  if (error) {
    console.log(error);
    return res.sendStatus(401);
  }

  req.user = user;
  next();
};

const hasRole =
  (...roles) =>
  async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    } else {
      return res.sendStatus(401);
    }
  };

module.exports = {
  hashPassword,
  makeJWT,
  decodeJWT,
  isLoggedIn,
  hasRole,
};
