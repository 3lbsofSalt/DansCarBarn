const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  res.json('Dan\'s Car Barn!');
});

module.exports = router;