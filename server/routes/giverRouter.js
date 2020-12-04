const express = require('express');
const router = new express.Router();
const addGiver = require('../giverLogic/addGiver.js');

router.post('/addGiver', (req, res) => {
  addGiver(req, res);
});


module.exports = router;