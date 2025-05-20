const express = require('express');
const router = express.Router();
const itemVariantController = require('../controllers/itemVariantController');

router.get('/', itemVariantController.getAllItemVariants);
router.post('/', itemVariantController.addItemVariant);
router.put('/:id', itemVariantController.updateItemVariant);
router.delete('/:id', itemVariantController.deleteItemVariant);

module.exports = router;
