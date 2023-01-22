import express from 'express';
const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  res.json('Dan\'s Car Barn!');
});

export default router;