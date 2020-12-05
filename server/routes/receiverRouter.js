const express = require('express');
const router = new express.Router();
const addReceiver = require('../receiverLogic/addReceiver.js');
const receiverLogin = require('../receiverLogic/receiverLogin.js');
const receiverAuth = require('../middleware/receiverAuth.js');
const receiverLogout = require('../receiverLogic/receiverLogout');

router.post('/receivers', (req, res) => {
  addReceiver(req, res);
});

router.post('/receivers/login', (req, res) => {
  receiverLogin(req, res);
});

router.post('/receivers/logout', receiverAuth, (req, res) => {
  receiverLogout(req, res);
});

module.exports = router;
