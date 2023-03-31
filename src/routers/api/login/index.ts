const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log('req', req?.body);
  res.json('login api');
});

module.exports = router;
