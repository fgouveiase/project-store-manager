const { productsModel } = require('../models');

const validateSale = async (req, res, next) => {
  const sales = req.body;

  if (sales.some((sale) => sale.productId === undefined)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (sales.some((sale) => sale.quantity === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (sales.some((sale) => sale.quantity <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const validateSaleProduct = async (req, res, next) => {
  const sales = req.body;
  const products = await Promise.all(sales.map((sale) => {
      const { productId } = sale;
      return productsModel.getById(productId);
    }));

  if (products.some((product) => product === undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  validateSale,
  validateSaleProduct,
};