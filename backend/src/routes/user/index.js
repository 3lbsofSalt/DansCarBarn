import express from 'express';
const router = express.Router();

import safeAwait from 'safe-await';
import { check } from 'express-validator';

import models from '../../models';
import { hashPassword, makeJWT, isLoggedIn } from '../../lib/auth.js';

router.post('/', check('email'), check('password'), async (req, res) => {
  const { email, password } = req.body;

  console.log(req);
  const [hashError, hash] = await safeAwait(hashPassword(password));
  if (hashError) {
    console.log(hashError);
    return res.sendStatus(500);
  }

  const [error] = await safeAwait(
    models.User.create({
      email,
      hash,
    })
  );

  if (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  return res.sendStatus(200);
});

router.post('/login', check('email'), check('password'), async (req, res) => {
  console.log(req);
  const { email, password } = req.body;

  const [userError, user] = await safeAwait(
    models.User.findOne({ where: { email } })
  );

  if (userError) {
    console.log(userError);
    return res.sendStatus(401);
  }

  if (!user || !user.checkPassword(password)) {
    console.log("The user's email or password was incorrect");
    return res.sendStatus(401);
  }

  const [jwtError, jwt] = await safeAwait(
    makeJWT({
      id: user.id,
    })
  );

  return res.status(200).json({
    token: jwt,
  });
});

router.get('/', isLoggedIn, async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
});

export default router;
