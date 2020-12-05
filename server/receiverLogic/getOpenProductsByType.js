const Product = require('../models/product.js');

const getOpenProductsByType = async (req, res) => {
  try {
    if (req.body.productType === '') {
      const products = await Product.find({ stateOfProduct: 'open' });

      res.send(products);
      
    } else {
      const products = await Product.find({ stateOfProduct: 'open', productType: req.body.productType });

      res.send(products);
    }
  } catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = getOpenProductsByType;