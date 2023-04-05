const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

router.post('/', (req: any, res: any) => {
  console.log('req', req.body);
  res.json({
    token: jwt.sign({...req.body}, process.env.accessTokenSecret, {
      expiresIn: '1d',
    }),
    userDetails: {...req.body},
  });
});

module.exports = router;
