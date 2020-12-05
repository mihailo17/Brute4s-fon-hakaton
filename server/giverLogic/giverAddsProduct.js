const Product = require('../models/product.js');

const giverAddsProduct = async (req, res) => {
  const product = new Product({
    ...req.body,
    giverThatGives: req.giver._id
  });

  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = giverAddsProduct;