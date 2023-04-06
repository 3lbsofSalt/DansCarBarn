import express from 'express';
const router = express.Router();

import safeAwait from 'safe-await';
import models from '../../models';

router.post('/', async (req, res, next) => {
  const {
    userId: UserId,
    vehicleId: VehicleId,
    start,
    end,
    status = 'SCHEDULED',
  } = req.body;

  console.log(new Date(start));
  console.log(new Date(end));

  const [error] = await safeAwait(
    models.Reservation.create({
      UserId,
      VehicleId,
      start,
      end,
      status,
    })
  );

  if (error) {
    return next(error);
  }

  return res.sendStatus(200);
});

router.get('/', async (req, res, next) => {
  const [error, results] = await safeAwait(models.Reservation.findAll());

  if (error) {
    return next(error);
  }

  return res.status(200).json({
    results,
  });
});

router.get('/:id', async (req, res, next) => {
  const [error, result] = await safeAwait(
    models.Reservation.findByPk(req.params.id)
  );

  if (error) {
    return next(error);
  }

  return res.status(200).json({
    result,
  });
});

router.put('/status/:id', async (req, res, next) => {
  const { status } = req.body;

  const [error] = await safeAwait(
    models.Reservation.update(
      {
        status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
  );

  if (error) {
    next(error);
  }

  return res.sendStatus(200);
});

export default router;
