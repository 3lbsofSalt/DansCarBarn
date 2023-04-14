import express from 'express';
const router = express.Router();
import safeAwait from 'safe-await';
import models from '../../models';
import sequelize from 'sequelize';

router.post('/', async (req, res, next) => {

  const {
    vehicleId,
    userId,
    total,
    description,
    start,
    end,
    status = 'SCHEDULED'
  } = req.body;

  const reserv = await models.Reservation.create({
    start,
    end,
    status
  });

  const trans = await models.Transaction.create({
    vehicleId,
    userId,
    total,
    description,
    type: 'RESERVATION',
    ReservationId: reserv.id
  });

  const user = await models.User.findByPk(userId);
  const available = user.subtractUserBalance(total);

  if(!available) {
    return res.sendStatus(400);
  }

  const manager = await models.User.findOne({ where: {
    role: 'MANAGER'
  }});

  manager.addUserBalance(total * .9);

  manager.save();
  user.save();

  return res.sendStatus(200);
});

export default router;
