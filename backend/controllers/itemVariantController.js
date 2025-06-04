const ItemVariantModel = require('../models/itemVariantModel');

exports.getAllItemVariants = async (req, res) => {
  try{
    const variants = await ItemVariantModel.getAll();
    res.json(variants);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

const itemVariantModel = require('../models/itemVariantModel'); // ✅ use model

exports.addItemVariant = async (req, res) => {
  try {
    const { name, unit, item_type_id } = req.body;

    if (!name?.trim() || !unit?.trim() || !item_type_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await itemVariantModel.create({ name, unit, item_type_id }); // ✅ use model, not db
    res.status(201).json(result);
  } catch (error) {
    console.error('[ERROR] addItemVariant:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.updateItemVariant = async (req, res) => {
  try{
    console.log('PUT /api/item-variants/:id body:', req.body); // ✅ log request body
    console.log('PUT /api/item-variants/:id param:', req.params.id); // ✅ log ID

    const updated = await ItemVariantModel.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

exports.deleteItemVariant = async (req, res) => {
  try{
    const result = await ItemVariantModel.delete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

exports.getDeletedItemVariants = async (req, res) => {
  try {
    const variants = await ItemVariantModel.getDeleted();
    res.json(variants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.restoreItemVariant = async (req, res) => {
  try {
    const variant = await ItemVariantModel.restore(req.params.id);
    res.json(variant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.truncateItemVariants = async (req, res) => {
  try {
    const result = await ItemVariantModel.truncate();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};