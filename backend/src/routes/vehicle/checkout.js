import express from 'express';
const router = express.Router();
import safeAwait from 'safe-await';
import models from '../../models';
import sequelize from 'sequelize';

router.post('/', async (req, res, next) => {
  console.log(req);
  const {
    vehicleId,
    userId,
    total,
    description,
    start,
    end,
    status = 'SCHEDULED',
  } = req.body;

  const user = await models.User.findByPk(userId);
  const available = user.subtractUserBalance(total);

  if (!available) {
    return res.sendStatus(400);
  }

  const trans = await models.Transaction.create({
    UserId: userId,
    total,
    description,
    type: 'RESERVATION',
  });

  const reserv = await models.Reservation.create({
    start,
    end,
    status,
    UserId: userId,
    VehicleId: vehicleId,
    TransactionId: trans.id,
  });

  const manager = await models.User.findOne({
    where: {
      role: 'MANAGER',
    },
  });

  manager.addUserBalance(total);

  manager.save();
  user.save();

  return res.sendStatus(200);
});

export default router;
