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
    const {name} = req.body;
    const newType = await ItemTypeModel.create(name);
    req.json(newType);  
  } catch (err) {
    res.status(500).json({ error: err.message});
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
