import express from 'express';
const router = express.Router();
import safeAwait from 'safe-await';
import models from '../../models';
import sequelize from 'sequelize';

router.post('/', async (req, res, next) => {

  const t = await sequelize.transaction();

  const {
    vehicleId,
    userId,
    total,
    description
  } = req.body;

  models.Transaction.create({
    vehicleId,
    userId,
    total,
    description,
    type: 'RESERVATION'
  }, {
    transaction: t
  });

  const user = await models.User.findByPk(userId);

  user.modifyUserBalance(-(total));

  user.save({ transaction: t });

  const [error] = await safeAwait(t.commit());

  console.log(error);

  return res.sendStatus(200);
});

export default router;
