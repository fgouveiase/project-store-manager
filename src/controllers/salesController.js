const salesService = require('../services/salesService');

const createSale = async (req, res, next) => {
try {
    const sales = req.body;
    const salesData = await salesService.createSale(sales);
    return res.status(201).json(salesData);
  } catch (error) {
    next(error);
  }
};

 const getAll = async (_req, res) => {
  const result = await salesService.getAll();
  if (result.length > 0) {
    res.status(200).json(result);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const salesProducts = await salesService.getById(id);
    return res.status(200).json(salesProducts);
  } catch (error) {
    return res.status(404).json({ message: 'Sale not found' });
  }
};

module.exports = { createSale, getAll, getById };