const db = require('./db');

exports.getAll = async () => {
  const result = await db.query(
    `SELECT inv.*, iv.name AS variant_name, iv.unit, it.name AS type_name
     FROM inventory inv
     JOIN item_variants iv ON inv.item_variant_id = iv.id
     JOIN item_types it ON iv.item_type_id = it.id
     WHERE inv.is_deleted = FALSE
     ORDER BY inv.id`
  );
  return result.rows;
};

exports.create = async ({ item_variant_id, received, sold, qty_on_hand, total_cost_received, avg_cost_per_piece }) => {
  const result = await db.query(
    `INSERT INTO inventory (item_variant_id, received, sold, qty_on_hand, total_cost_received, avg_cost_per_piece)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [item_variant_id, received, sold, qty_on_hand, total_cost_received, avg_cost_per_piece]
  );
  return result.rows[0];
};

exports.update = async (id, { received, sold, qty_on_hand, total_cost_received, avg_cost_per_piece }) => {
  const result = await db.query(
    `UPDATE inventory SET
      received = $1,
      sold = $2,
      qty_on_hand = $3,
      total_cost_received = $4,
      avg_cost_per_piece = $5
     WHERE id = $6 RETURNING *`,
    [received, sold, qty_on_hand, total_cost_received, avg_cost_per_piece, id]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  await db.query(`UPDATE inventory SET is_deleted = TRUE WHERE id = $1`, [id]);
  return { success: true };
};
