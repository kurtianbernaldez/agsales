const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.getAllInventory);
router.post('/', inventoryController.addInventory);
// order matters: specific routes before :id
router.delete('/truncate/all', inventoryController.truncateInventory);
router.get('/deleted/all', inventoryController.getDeletedInventory);
router.post('/restore/:id', inventoryController.restoreInventory);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;
