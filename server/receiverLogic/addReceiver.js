const Receiver = require('../models/receiver.js');

const addReceiver = async (req, res) => {
  const receiver = new Receiver(req.body);
  const token = await receiver.generateAuthToken();

  res.status(201).send({ receiver, token });
  try {
    await receiver.save();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = addReceiver;