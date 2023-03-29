import express from 'express';
const router = express.Router();

import safeAwait from 'safe-await';
import models from '../../models';

router.post('/', async (req, res, next) => {
  const {
    make,
    model,
    year,
    price_class,
    imageId
  } = req.body;

  const [error] = await safeAwait(models.Vehicle.create({
    make,
    model,
    year,
    price_class,
    imageId
  }));

  if(error) {
    return next(error);
  }

  return res.sendStatus(200);

});

router.put('/:id', async (req, res, next) => {

  const body = req.body;

  const [error] = await safeAwait(models.Vehicle.update({
    ...body
  }, {
    where: {
      id
    }
  }));

  if(error) {
    return next(error);
  }

  return res.sendStatus(200);
});

router.get('/all', async (req, res, next) => {

  const [error, results] = await safeAwait(models.Vehicle.findAll());

  if(error) {
    return next(error);
  }

  return res.status(200).json({
    results
  });

});

router.get('/browse', async (req, res, next) => {
  const {
    start,
    end
  } = req.params;

  const [error, results] = await safeAwait(models.Vehicle.findAll({
    include: [{
      model: models.Reservation
    }]
  }));

  if(error) {
    return next(error);
  }

  return res.status(200).json({
    results
  });
});

export default router;
