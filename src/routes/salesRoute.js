const express = require('express');
const { salesController } = require('../controllers');
const { validateSale, validateSaleProduct } = require('../middlewares/validationSales');

const router = express.Router();

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.post('/', validateSale, validateSaleProduct, salesController.createSale);

module.exports = router;