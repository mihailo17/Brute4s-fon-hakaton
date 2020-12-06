const Product = require('../models/product.js');

const getOpenProductsByType = async (req, res) => {
  try {
    if (req.body.productTypes.length === 0) {
      const products = await Product.find({ stateOfProduct: 'open' });

      res.send(products);
      
    } else {
      const products = await Product.find({ stateOfProduct: 'open', productType: { $in: req.body.productTypes } });
        
      res.send(products);
    }
  } catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = getOpenProductsByType;