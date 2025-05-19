const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');


router.get('/', (req, res) => {
  res.send('Inventory route is working');
});

router.post('/', (req, res) => {
  res.send('Inventory route is working');
});

router.get('/', inventoryController.getAllInventory);
router.post('/', inventoryController.addInventory);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;
