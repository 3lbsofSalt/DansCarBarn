import express from 'express';
const router = express.Router();
import user from './user/';

/* GET home page */
router.get('/', (req, res) => {
  res.json("Dan's Car Barn Authentication Prototype!");
});

router.use('/user', user);

export default router;
