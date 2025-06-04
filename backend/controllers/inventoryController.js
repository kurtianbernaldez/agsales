// backend/controllers/inventoryController.js
const InventoryModel = require('../models/inventoryModel');

exports.getAllInventory = async (req, res) => {
  try {
    const rows = await InventoryModel.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addInventory = async (req, res) => {
  try {
    const item = await InventoryModel.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const item = await InventoryModel.update(req.params.id, req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const result = await InventoryModel.delete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDeletedInventory = async (req, res) => {
  try {
    const rows = await InventoryModel.getDeleted();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.restoreInventory = async (req, res) => {
  try {
    const item = await InventoryModel.restore(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.truncateInventory = async (req, res) => {
  try {
    const result = await InventoryModel.truncate();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
