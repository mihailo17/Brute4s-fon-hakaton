const giverLogin = require("./giverLogin")

const giverLogout = (req, res) => {
  try {
    console.log(req.giver);
    res.send();
  } catch(error) {
    console.log(error);
    res.status(400).send(error)
  }
}

module.exports = giverLogout;