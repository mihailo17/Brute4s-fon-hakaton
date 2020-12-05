const Product = require('../models/product.js');

const resolveProduct = async (req, res) => {
  try {
    let newProduct = await Product.findOne({_id: req.body.productId, giverThatGives: req.giver._id });

    if (!newProduct) {
      return res.status(404).send('There is no product with that id for this giver');
    }

    newProduct.stateOfProduct = req.body.stateOfProduct;
    await newProduct.save();

    res.send(newProduct);

  } catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = resolveProduct;