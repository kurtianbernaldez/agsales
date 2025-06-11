const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.getAllInventory);
router.post('/', inventoryController.addInventory);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);
router.get('/deleted/all', inventoryController.getDeletedInventory);
router.post('/restore/:id', inventoryController.restoreInventory);
router.delete('/truncate/all', inventoryController.truncateInventory);
module.exports = router;
    