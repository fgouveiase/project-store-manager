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

module.exports = {
  getAll,
  getById,
  createProducts,
};