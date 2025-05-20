const express = require('express');
const router = express.Router();
const itemTypeController = require('../controllers/itemTypeController');

router.get('/', itemTypeController.getAllItemTypes);
router.post('/', itemTypeController.addItemType);
router.put('/:id', itemTypeController.updateItemType);
router.delete('/:id', itemTypeController.deleteItemType);

module.exports = router;
