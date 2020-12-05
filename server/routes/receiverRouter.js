const express = require('express');
const router = new express.Router();
const addReceiver = require('../receiverLogic/addReceiver.js');
const receiverLogin = require('../receiverLogic/receiverLogin.js');

router.post('/receivers', (req, res) => {
  addReceiver(req, res);
});

router.post('/receivers/login', (req, res) => {
  receiverLogin(req, res);
});

module.exports = router;
