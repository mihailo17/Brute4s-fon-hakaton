const giverLogout = async (req, res) => {
  try {
    req.giver.tokens = req.giver.tokens.filter(token => {
      return token.token !== req.token
    });

    await req.giver.save();

    res.send();
  } catch(error) {
    console.log(error);
    res.status(400).send(error)
  }
}

module.exports = giverLogout;