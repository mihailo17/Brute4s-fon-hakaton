const receiverLogout = async (req, res) => {
  try {
    req.receiver.tokens = req.receiver.tokens.filter(token => {
      return token.token !== req.token
    });

    await req.receiver.save();

    res.send();
  } catch(error) {
    console.log(error);
    res.status(400).send(error)
  }
}

module.exports = receiverLogout;