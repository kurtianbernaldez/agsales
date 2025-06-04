const express = require('express');
const router = express.Router();
const itemTypeController = require('../controllers/itemTypeController');

router.get('/', itemTypeController.getAllItemTypes);
router.post('/', itemTypeController.addItemType);
// order important: more specific routes first
router.delete('/truncate/all', itemTypeController.truncateItemTypes);
router.get('/deleted/all', itemTypeController.getDeletedItemTypes);
router.post('/restore/:id', itemTypeController.restoreItemType);
router.put('/:id', itemTypeController.updateItemType);
router.delete('/:id', itemTypeController.deleteItemType);

module.exports = router;
