const Receiver = require('../models/receiver.js');

const receiverLogin = async (req, res) => {
  try {
    const receiver = await Receiver.findByCredentials(req.body.email, req.body.password);
    const token = await receiver.generateAuthToken();

    res.send({ receiver, token });

  } catch (error) {
    console.log(error);
    res.status(400).send('Unable to login');
  }
}

module.exports = receiverLogin;