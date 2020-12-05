const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config.json').jwtSecret;

const giverSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

giverSchema.statics.findByCredentials = async (email, password) => {
  const giver = await Giver.findOne({ email });

  if (!giver) {
      throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, giver.password);

  if (!isMatch) {
      throw new Error('Unable to login');
  }

  return giver;
};  


giverSchema.methods.toJSON = function() {
  const giver = this;
  const giverObject = giver.toObject();

  delete giverObject.password;
  delete giverObject.tokens;

  return giverObject;
}

giverSchema.methods.generateAuthToken = async function() {
  const giver = this;
  const token = jwt.sign({ _id: giver._id.toString() }, jwtSecret);

  giver.tokens = giver.tokens.concat({ token });

  try {
    await giver.save();
  } catch(error) {
    console.log(error);
  }
  return token;
}

giverSchema.pre('save', async function (next) {
  const giver = this;

  if (giver.isModified('password')) {
      giver.password = await bcrypt.hash(giver.password, 8);
  }

  next(); 
})

const Giver = mongoose.model('Giver', giverSchema);
module.exports = Giver;