const express = require('express');
const router = express.Router();
const offsetController = require('../controllers/offsetController');

router.get('/', offsetController.getAllOffsets);
router.post('/', offsetController.addOffset);
router.put('/:id', offsetController.updateOffset);
router.delete('/:id', offsetController.deleteOffset);
router.get('/deleted', offsetController.getDeletedOffsets);
router.post('/restore/:id', offsetController.restoreOffset);

module.exports = router;
