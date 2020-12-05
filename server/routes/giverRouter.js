const express = require('express');
const router = new express.Router();
const addGiver = require('../giverLogic/addGiver.js');
const giverLogin = require('../giverLogic/giverLogin.js');
const giverLogout = require('../giverLogic/giverLogout.js');
const giverAuth = require('../middleware/giverAuth.js');

router.post('/givers', (req, res) => {
  addGiver(req, res);
});

router.post('/givers/login', (req, res) => {
  giverLogin(req, res);
});

router.post('/givers/logout', giverAuth, (req, res) => {
  giverLogout(req, res);
});


module.exports = router;