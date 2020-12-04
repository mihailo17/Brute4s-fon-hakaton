const mongoose = require('mongoose');

const giverSchema = new mongoose.Schema({
  email: {
    type: String
  }
});

const Giver = mongoose.model('Giver', giverSchema);
module.exports = Giver;