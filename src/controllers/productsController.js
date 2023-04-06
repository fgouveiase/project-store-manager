const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const allProducts = await productsService.getAll();
  if (allProducts.length > 0) {
    res.status(200).json(allProducts);
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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productsService.getById(id);
  if (!result) {
    res.status(404).json({ message: 'Product not found' });
  }
  const newProduct = await productsService.updateProduct(name, Number(id));
  res.status(200).json(newProduct);
};

const deleteProduct = async (req, res) => { 
  const { id } = req.params;
  const result = await productsService.getById(id);
  if (!result) {
    res.status(404).json({ message: 'Product not found' });
  }
  await productsService.deleteProduct(id);
  res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  createProducts,
  updateProduct,
  deleteProduct,
};