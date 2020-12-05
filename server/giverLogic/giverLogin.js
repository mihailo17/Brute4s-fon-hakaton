const Giver = require('../models/giver.js');

const giverLogin = async (req, res) => {
  try {
    const giver = await Giver.findByCredentials(req.body.email, req.body.password);
    const token = await giver.generateAuthToken();

    res.send({ giver, token });

  } catch (error) {
    console.log(error);
    res.status(400).send('Unable to login');
  }
}

module.exports = giverLogin;