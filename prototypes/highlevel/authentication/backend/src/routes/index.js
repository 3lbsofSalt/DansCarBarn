import express from 'express';
const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  res.json("Dan's Car Barn Authentication Prototype!");
});

export default router;
