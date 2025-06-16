const PurchaseModel = require('../models/purchaseModel');

exports.getAllPurchases = async (req, res) => {
  try {
    const rows = await PurchaseModel.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addPurchase = async (req, res) => {
  try {
    const purchase = await PurchaseModel.create(req.body);
    res.json(purchase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePurchase = async (req, res) => {
  try {
    const purchase = await PurchaseModel.update(req.params.id, req.body);
    res.json(purchase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePurchase = async (req, res) => {
  try {
    const result = await PurchaseModel.delete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDeletedPurchases = async (req, res) => {
  try {
    const rows = await PurchaseModel.getDeleted();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.restorePurchase = async (req, res) => {
  try {
    const purchase = await PurchaseModel.restore(req.params.id);
    res.json(purchase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
