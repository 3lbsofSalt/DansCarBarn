import express from 'express';
const router = express.Router();

import safeAwait from 'safe-await';

import models from '../../models';
import { hashPassword, isLoggedIn, hasRole } from '../../lib/auth.js';

router.use(isLoggedIn);

router.post('/', async (req, res, next) => {
  const { email, password, role = 'CUSTOMER' } = req.body;

  const [hashError, hash] = await safeAwait(hashPassword(password));

  if (hashError) {
    return next(hashError);
  }

  const [error] = await safeAwait(
    models.User.create({
      email,
      hash,
      balance: 0,
      role,
    })
  );

  if (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  return res.sendStatus(200);
});

router.get('/', async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
});

router.get('/all', async (req, res, next) => {
  const [error, results] = await safeAwait(models.User.findAll());
  if (error) return next(error);
  return res.status(200).json({ results });
});

router.put('/:id', async (req, res) => {
  const { password, role } = req.body;

  const update = {};

  if (role) {
    update.role = role;
  }

  if (password) {
    const [hashError, hash] = await safeAwait(hashPassword(password));

    if (hashError) {
      return next(hashError);
    }

    update.hash = hash;
  }

  const [error] = await safeAwait(
    models.User.update(update, {
      where: {
        id: req.params.id,
      },
    })
  );

  if (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  return res.sendStatus(200);
});

router.put('/:id/balance', async (req, res) => {
  const { total = 0 } = req.body;
  console.log(total);
  console.log(req);

  const user = await models.User.findByPk(req.params.id);

  user.addUserBalance(total);

  user.save();

  return res.sendStatus(200);
});

export default router;
