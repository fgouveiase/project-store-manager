const salesModel = require('../models/salesModel');

const getAll = async () => {
 const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  return result;
};
const createSale = async (item) => {
  const sale = await salesModel.createSale();
  const salePromises = item.map(async (promise) =>
    salesModel.createSaleProduct(sale, promise.productId, promise.quantity));
  await Promise.all(salePromises);

  const itemSale = item.map(({ productId, quantity }) => ({ productId, quantity }));
  return {
    id: sale,
    itemsSold: itemSale,
  };
};

module.exports = { createSale, getAll, getById };