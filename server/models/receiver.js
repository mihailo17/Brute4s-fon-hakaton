const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config.json').jwtSecret;

const receiverSchema = new mongoose.Schema({
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

receiverSchema.statics.findByCredentials = async (email, password) => {
  const receiver = await Receiver.findOne({ email });

  if (!receiver) {
      throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, receiver.password);

  if (!isMatch) {
      throw new Error('Unable to login');
  }

  return receiver;
};  


receiverSchema.methods.toJSON = function() {
  const receiver = this;
  const receiverObject = receiver.toObject();

  delete receiverObject.password;
  delete receiverObject.tokens;

  return receiverObject;
}

receiverSchema.methods.generateAuthToken = async function() {
  const receiver = this;
  const token = jwt.sign({ _id: receiver._id.toString(), userType: 'receiver' }, jwtSecret);

  receiver.tokens = receiver.tokens.concat({ token });

  try {
    await receiver.save();
  } catch(error) {
    console.log(error);
  }
  return token;
}

receiverSchema.pre('save', async function (next) {
  const receiver = this;

  if (receiver.isModified('password')) {
      receiver.password = await bcrypt.hash(receiver.password, 8);
  }

  next(); 
})

const Receiver = mongoose.model('Receiver', receiverSchema);
module.exports = Receiver;