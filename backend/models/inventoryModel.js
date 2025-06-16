const db = require('./db');

exports.getAll = async () => {
  const result = await db.query(
    `SELECT inv.*, iv.name AS variant_name, iv.unit,
            it.name AS type_name
     FROM inventory inv
     JOIN item_variants iv ON inv.item_variant_id = iv.id
     JOIN item_types it ON inv.item_type_id = it.id
     WHERE inv.is_deleted = FALSE
     ORDER BY inv.id`
  );
  return result.rows;
};

exports.create = async ({ item_variant_id, item_type_id, received, sold, qty_on_hand, total_cost_received, avg_cost_per_piece }) => {
  // First verify that the variant exists and matches the type
  const variantCheck = await db.query(
    `SELECT id FROM item_variants 
     WHERE id = $1 AND item_type_id = $2 AND is_deleted = FALSE`,
    [item_variant_id, item_type_id]
  );

  if (variantCheck.rows.length === 0) {
    throw new Error('Invalid item variant or type combination');
  }

  const result = await db.query(
    `INSERT INTO inventory (
      item_variant_id, 
      item_type_id, 
      received, 
      sold, 
      qty_on_hand, 
      total_cost_received, 
      avg_cost_per_piece
    )
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      item_variant_id, 
      item_type_id, 
      received || 0, 
      sold || 0, 
      qty_on_hand || 0, 
      total_cost_received || 0, 
      avg_cost_per_piece || 0
    ]
  );
  return result.rows[0];
};

exports.update = async (id, { item_variant_id, item_type_id, received, sold, qty_on_hand, total_cost_received, avg_cost_per_piece }) => {
  // First verify that the variant exists and matches the type if they're being updated
  if (item_variant_id && item_type_id) {
    const variantCheck = await db.query(
      `SELECT id FROM item_variants 
       WHERE id = $1 AND item_type_id = $2 AND is_deleted = FALSE`,
      [item_variant_id, item_type_id]
    );

    if (variantCheck.rows.length === 0) {
      throw new Error('Invalid item variant or type combination');
    }
  }

  const result = await db.query(
    `UPDATE inventory SET
      item_variant_id = COALESCE($1, item_variant_id),
      item_type_id = COALESCE($2, item_type_id),
      received = COALESCE($3, received),
      sold = COALESCE($4, sold),
      qty_on_hand = COALESCE($5, qty_on_hand),
      total_cost_received = COALESCE($6, total_cost_received),
      avg_cost_per_piece = COALESCE($7, avg_cost_per_piece)
     WHERE id = $8 RETURNING *`,
    [
      item_variant_id,
      item_type_id,
      received,
      sold,
      qty_on_hand,
      total_cost_received,
      avg_cost_per_piece,
      id
    ]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  await db.query(`UPDATE inventory SET is_deleted = TRUE WHERE id = $1`, [id]);
  return { success: true };
};

exports.getDeleted = async () => {
  const result = await db.query(
    `SELECT inv.*, iv.name AS variant_name, iv.unit,
            it.name AS type_name
     FROM inventory inv
     JOIN item_variants iv ON inv.item_variant_id = iv.id
     JOIN item_types it ON inv.item_type_id = it.id
     WHERE inv.is_deleted = TRUE
     ORDER BY inv.id`
  );
  return result.rows;
};

exports.restore = async (id) => {
  const result = await db.query(
    'UPDATE inventory SET is_deleted = FALSE WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};
