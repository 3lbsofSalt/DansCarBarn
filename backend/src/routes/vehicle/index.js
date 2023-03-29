import express from 'express';
import { isLoggedIn, hasRole } from '../../lib/auth';
const router = express.Router();

import safeAwait from 'safe-await';
import models from '../../models';

router.use(isLoggedIn);
router.use(hasRole('MANAGER'));

router.post('/', async (req, res, next) => {
  const { make, model, year, price_class, image } = req.body;

  const [error, vehicle] = await safeAwait(
    models.Vehicle.create({
      make,
      model,
      year,
      price_class,
      image,
      deleted: false,
    })
  );

  if (error) {
    return next(error);
  }

  return res.json(vehicle);
});

router.put('/:id', async (req, res, next) => {
  const body = req.body;

  const [error] = await safeAwait(
    models.Vehicle.update(
      {
        ...body,
      },
      {
        where: {
          id,
        },
      }
    )
  );

  if (error) {
    return next(error);
  }

  return res.sendStatus(200);
});

router.delete('/:id', async (req, res, next) => {
  const [error, results] = await safeAwait(
    models.Vehicle.update(
      {
        deleted: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
  );

  if (error) return next(error);

  return res.status(200).json(results);
});

router.get('/', async (req, res, next) => {
  const [error, results] = await safeAwait(
    models.Vehicle.findAll({
      where: {
        deleted: false,
      },
    })
  );

  if (error) {
    return next(error);
  }

  return res.status(200).json(results);
});

export default router;
