const express = require('express');
const router = express.Router();
const itemTypeController = require('../controllers/itemTypeController');

router.get('/', itemTypeController.getAllItemTypes);
router.post('/', itemTypeController.addItemType);
router.put('/:id', itemTypeController.updateItemType);
router.delete('/:id', itemTypeController.deleteItemType);
router.get('/deleted/all', itemTypeController.getDeletedItemTypes);
router.post('/restore/:id', itemTypeController.restoreItemType);
router.delete('/truncate/all', itemTypeController.truncateItemTypes);

module.exports = router;
