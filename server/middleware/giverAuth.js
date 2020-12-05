const jwt = require('jsonwebtoken');
const Giver = require('../models/giver');
const jwtSecret = require('../config.json').jwtSecret;

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, jwtSecret);
      const giver = await Giver.findOne({ _id: decoded._id, 'tokens.token': token });

      if(!giver) {
        throw new Error();
      }

      req.token = token;
      req.giver = giver;

      next();
  } catch(error) {
    console.log(error);
    res.status(401).send({error: 'You are not loged in'});
  }
}

module.exports = auth;