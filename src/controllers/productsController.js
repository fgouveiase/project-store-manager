const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  if (products) {
    res.status(200).json(products);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await productsService.getById(id);
  if (!products) {
    res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(products);
};

const createProducts = async (req, res, next) => { 
  try {
  const { name } = req.body;
  const result = await productsService.createProducts(name);
 res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  createProducts,
};