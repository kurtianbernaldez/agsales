const ItemVariantModel = require('../models/itemVariantModel');

exports.getAllItemVariants = async (req, res) => {
  try{
    const variants = await ItemVariantModel.getAll();
    res.json(variants);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

exports.addItemVariant = async (req, res) => {
  try{
    const { name, item_type_id, unit } = req.body;
    const newVariant = await ItemVariantModel.create({ name, item_type_id, unit });
    res.json(newVariant);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

exports.updateItemVariant = async (req, res) => {
  try{
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