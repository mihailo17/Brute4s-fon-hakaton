const express = require('express');
const router = new express.Router();
const addGiver = require('../giverLogic/addGiver.js');

router.post('/givers', (req, res) => {
  addGiver(req, res);
});


module.exports = router;