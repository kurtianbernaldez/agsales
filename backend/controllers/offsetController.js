const OffsetModel = require('../models/offsetModel');

exports.getAllOffsets = async (req, res) => {
  try {
    const rows = await OffsetModel.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addOffset = async (req, res) => {
  try {
    const offset = await OffsetModel.create(req.body);
    res.json(offset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOffset = async (req, res) => {
  try {
    const offset = await OffsetModel.update(req.params.id, req.body);
    res.json(offset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOffset = async (req, res) => {
  try {
    const result = await OffsetModel.delete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDeletedOffsets = async (req, res) => {
  try {
    const rows = await OffsetModel.getDeleted();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.restoreOffset = async (req, res) => {
  try {
    const offset = await OffsetModel.restore(req.params.id);
    res.json(offset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
