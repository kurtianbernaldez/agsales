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
    console.log('POST /api/item-types body:', req.body); // Debug log

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
