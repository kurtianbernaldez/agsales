const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

router.get('/', purchaseController.getAllPurchases);
router.post('/', purchaseController.addPurchase);
router.put('/:id', purchaseController.updatePurchase);
router.delete('/:id', purchaseController.deletePurchase);
router.get('/deleted', purchaseController.getDeletedPurchases);
router.post('/restore/:id', purchaseController.restorePurchase);

module.exports = router;
