import express from 'express';
const router = express.Router();

import safeAwait from 'safe-await';
import models from '../../models';

router.post('/', async (req, res) => {
  const {
    make,
    model,
    year,
    price_class,
    imageId
  } = req.body;

  const [error] = safeAwait(await models.Vehicle.create({
    make,
    model,
    year,
    price_class,
    imageId
  }));

  if(error) {
    console.log(error);
    return res.sendStatus(500);
  }

  return res.sendStatus(200);

});

export default router;
