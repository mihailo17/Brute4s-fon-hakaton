const Product = require('../models/product.js');

const getGiversProducts = async (req, res) => {
  try {
    const products = await Product.find({ giverThatGives: req.giver._id});

    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

module.exports = getGiversProducts;