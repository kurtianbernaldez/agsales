const express = require('express');
const router = express.Router();
const itemVariantController = require('../controllers/itemVariantController');

router.get('/', itemVariantController.getAllItemVariants);
router.post('/', itemVariantController.addItemVariant);
router.put('/:id', itemVariantController.updateItemVariant);
router.delete('/:id', itemVariantController.deleteItemVariant);
router.get('/deleted/all', itemVariantController.getDeletedItemVariants);
router.post('/restore/:id', itemVariantController.restoreItemVariant);
router.delete('/truncate/all', itemVariantController.truncateItemVariants);
module.exports = router;
