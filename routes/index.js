const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/hello', (req, res, next) => {
  res.json('respond with a resource');
});

module.exports = router;
