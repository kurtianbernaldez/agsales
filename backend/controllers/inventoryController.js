const db = require('../models/db'); // Your pg connection

exports.getAllInventory = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT inv.*, iv.name AS variant_name, iv.unit, it.name AS type_name
       FROM inventory inv
       JOIN item_variants iv ON inv.variant_id = iv.id
       JOIN item_types it ON iv.item_type_id = it.id
       ORDER BY inv.id`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addInventory = async (req, res) => {
  try {
    const { variant_id, received, sold, qty_on_hand, total_cost_received, avg_cost_per_piece } = req.body;
    const result = await db.query(
      `INSERT INTO inventory
       (variant_id, received, sold, qty_on_hand, total_cost_received, avg_cost_per_piece)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [variant_id, received, sold, qty_on_hand, total_cost_received, avg_cost_per_piece]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query(`DELETE FROM inventory WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
