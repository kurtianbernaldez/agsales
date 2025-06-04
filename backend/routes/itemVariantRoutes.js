const express = require('express');
const router = express.Router();
const itemVariantController = require('../controllers/itemVariantController');

router.get('/', itemVariantController.getAllItemVariants);
router.post('/', itemVariantController.addItemVariant);
// ensure specific routes come before id-based ones
router.delete('/truncate/all', itemVariantController.truncateItemVariants);
router.get('/deleted/all', itemVariantController.getDeletedItemVariants);
router.post('/restore/:id', itemVariantController.restoreItemVariant);
router.put('/:id', itemVariantController.updateItemVariant);
router.delete('/:id', itemVariantController.deleteItemVariant);

module.exports = router;
