import express from 'express';
const router = express.Router();
import user from './user/';

import vehicle from './vehicle/index.js';

router.use('/vehicle', vehicle);
/* GET home page */
router.get('/', (req, res) => {
  res.json("Dan's Car Barn Authentication Prototype!");
});

router.use('/user', user);

export default router;
