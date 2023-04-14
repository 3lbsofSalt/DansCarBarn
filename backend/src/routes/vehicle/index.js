import express from 'express';
const router = express.Router();
import { Op } from 'sequelize';

import safeAwait from 'safe-await';
import models from '../../models';
import checkout from './checkout.js';

router.use('/checkout', checkout);

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
      include: [
        {
          model: models.Reservation,
          as: 'Reservations',
        },
      ],
    })
  );

  if (error) {
    return next(error);
  }

  return res.status(200).json(results);
});

router.get('/browse', async (req, res, next) => {
  const {
    start, // Takes the form "MM/DD/YYYY"
    end, // Takes the form "MM/DD/YYYY"
  } = req.query;

  const [error, results] = await safeAwait(
    models.Vehicle.findAll({
      include: [
        {
          model: models.Reservation,
          as: 'Reservations',
          required: false,
          where: {
            // Get any reservations that are during the time specified for that vehicle
            [Op.not]: {
              [Op.and]: [
                {
                  end: {
                    [Op.notBetween]: [start, end],
                  },
                },
                {
                  start: {
                    [Op.notBetween]: [start, end],
                  },
                },
                {
                  [Op.or]: [
                    {
                      start: {
                        [Op.gt]: start,
                      },
                    },
                    {
                      end: {
                        [Op.lt]: end,
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
    })
  );

  // Filter the vehicles so that only the ones that aren't reserved during the time specified are available.
  const finalResults = results.filter(
    (vehicle) => vehicle.Reservations.length === 0
  );

  if (error) {
    return next(error);
  }

  return res.status(200).json({
    results: finalResults,
  });
});

export default router;
