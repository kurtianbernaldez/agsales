const ItemTypeModel = require('../models/itemTypeModel');

exports.getAllItemTypes = async (req, res) => {
  try{
      const types = await ItemTypeModel.getAll();
      res.json(types);
  } catch (err) {
      res.status(500).json({ error: err.message});
  }
};

exports.addItemType = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Missing item type name' });
    }

    const result = await ItemTypeModel.create(name);

    res.status(201).json(result);
  } catch (error) {
    console.error('[ERROR] addItemType:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.updateItemType = async (req, res) => {
  try {
    const {name} = req.body;
    const updated = await ItemTypeModel.update(req.params.id, name);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

exports.deleteItemType = async (req, res) => {
  try{
      const result = await ItemTypeModel.delete(req.params.id);
      res.json(result);
  } catch (err) {
      res.status(500).json({ error: err.message});
  }
};

exports.getDeletedItemTypes = async (req, res) => {
  try {
    const types = await ItemTypeModel.getDeleted();
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.restoreItemType = async (req, res) => {
  try {
    const type = await ItemTypeModel.restore(req.params.id);
    res.json(type);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.truncateItemTypes = async (req, res) => {
  try {
    const result = await ItemTypeModel.truncate();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
