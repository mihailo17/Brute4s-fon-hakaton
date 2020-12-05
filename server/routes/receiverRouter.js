const express = require('express');
const router = new express.Router();
const addReceiver = require('../receiverLogic/addReceiver.js');

router.post('/receivers', (req, res) => {
  addReceiver(req, res);
});


module.exports = router;