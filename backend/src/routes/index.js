import express from 'express';
const router = express.Router();

import vehicle from './vehicle/index.js';

router.use('/vehicle', vehicle);
/* GET home page */
router.get('/', (req, res) => {
  res.json("Dan's Car Barn!");
});

export default router;
