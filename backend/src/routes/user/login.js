import express from 'express';
const router = express.Router();

import safeAwait from 'safe-await';

import models from '../../models';
import { makeJWT } from '../../lib/auth.js';

router.post('/login', async (req, res) => {
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
      role: user.role,
    })
  );

  return res.status(200).json({
    token: jwt,
  });
});

export default router;
