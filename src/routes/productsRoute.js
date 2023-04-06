const express = require('express');
const { productsController } = require('../controllers');
const { validateProduct } = require('../middlewares/validationProduct');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', validateProduct, productsController.createProducts);
router.put('/:id', validateProduct, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;