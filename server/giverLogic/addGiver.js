const Giver = require('../models/giver.js');

const addGiver = async (req, res) => {
  const giver = new Giver(req.body);
  const token = await giver.generateAuthToken();

  res.status(201).send({ giver, token });
  try {
    await giver.save();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = addGiver;