const Product = require('../models/product.js');

const claimProducts = async (req, res) => {
  try {
    req.body.products.forEach(async (productFromRequest) => {
      let product = await Product.findById({ _id: productFromRequest });
      product.stateOfProduct = 'claimed';
      product.receiverThatReceives = req.receiver._id;

      await product.save();
    });

    res.send();

  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}


module.exports = claimProducts;