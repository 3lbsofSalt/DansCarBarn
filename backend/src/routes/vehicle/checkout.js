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
    employeeId,
  } = req.body;

  models.Transaction.create({
    vehicleId,
    userId,
    total,
    description,
    type: 'RESERVATION'
  });

  const user = await models.User.findByPk(userId);
  const available = user.subtractUserBalance(total);

  if(!available) {
    return res.sendStatus(400);
  }

  const employee = await models.User.findByPk(employeeId);
  const manager = await models.User.findOne({ where: {
    role: 'MANAGER'
  }});

  console.log(employee);

  employee.addUserBalance(total * .1);
  manager.addUserBalance(total * .9);

  employee.save();
  manager.save();
  user.save();

  return res.sendStatus(200);
});

export default router;
