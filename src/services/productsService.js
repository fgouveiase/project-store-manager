const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const productsById = await productsModel.getById(id);
  return productsById;
};

const createProducts = async (name) => {
  const products = await productsModel.createProducts(name);
  return products;
};

const updateProduct = async (name, id) => {
  await productsModel.updateProduct(name, id);
  const newProduct = await productsModel.getById(id);
  return newProduct;
};

const deleteProduct = async (id) => {
  await productsModel.deleteProduct(id);
};

module.exports = {
  getAll,
  getById,
  createProducts,
  updateProduct,
  deleteProduct,
};