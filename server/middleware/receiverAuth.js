const jwt = require('jsonwebtoken');
const Receiver = require('../models/receiver');
const jwtSecret = require('../config.json').jwtSecret;

const receiverAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, jwtSecret);
      const receiver = await Receiver.findOne({ _id: decoded._id, 'tokens.token': token });
      if(!receiver) {
        throw new Error();
      }

      req.token = token;
      req.receiver = receiver;

      next();
  } catch(error) {
    console.log(error);
    res.status(401).send({error: 'You are not loged in'});
  }
}

module.exports = receiverAuth;