const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', (req: any, res: any) => {
  res.json({
    token: jwt.sign({...req.body}, process.env.accessTokenSecret, {
      expiresIn: '1d',
    }),
    userDetails: {...req.body},
  });
});

module.exports = router;
