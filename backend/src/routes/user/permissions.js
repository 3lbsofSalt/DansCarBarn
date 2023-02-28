import express from 'express';
const router = express.Router();

import safeAwait from 'safe-await';

import models from '../../models';

router.put('/', async (req, res) => {
  const {
    id,
    role
  } = req.body;

  const [error] = await safeAwait(models.User.update({
    role
  },{ where: {
    id
  }}));

  if(error) {
    console.log(error);
    return res.sendStatus(500);
  }

  return res.sendStatus(200);
});

export default router;
