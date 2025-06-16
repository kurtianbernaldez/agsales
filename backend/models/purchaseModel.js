const db = require('./db');

exports.getAll = async () => {
  const result = await db.query(
    `SELECT p.*, iv.name AS variant_name, iv.unit
     FROM purchases p
     JOIN item_variants iv ON p.item_variant_id = iv.id
     WHERE p.is_deleted = FALSE
     ORDER BY p.id`
  );
  return result.rows;
};

exports.create = async ({ item_variant_id, purchase_date, quantity, unit, cost, total_cost, vendor }) => {
  // First verify that the variant exists
  const variantCheck = await db.query(
    `SELECT id FROM item_variants 
     WHERE id = $1 AND is_deleted = FALSE`,
    [item_variant_id]
  );

  if (variantCheck.rows.length === 0) {
    throw new Error('Invalid item variant');
  }

  const result = await db.query(
    `INSERT INTO purchases (
      item_variant_id, 
      purchase_date,
      quantity,
      unit,
      cost,
      total_cost,
      vendor
    )
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      item_variant_id, 
      purchase_date,
      quantity || 0,
      unit,
      cost || 0,
      total_cost || 0,
      vendor
    ]
  );
  return result.rows[0];
};

exports.update = async (id, { item_variant_id, purchase_date, quantity, unit, cost, total_cost, vendor }) => {
  // First verify that the variant exists if it's being updated
  if (item_variant_id) {
    const variantCheck = await db.query(
      `SELECT id FROM item_variants 
       WHERE id = $1 AND is_deleted = FALSE`,
      [item_variant_id]
    );

    if (variantCheck.rows.length === 0) {
      throw new Error('Invalid item variant');
    }
  }

  const result = await db.query(
    `UPDATE purchases SET
      item_variant_id = COALESCE($1, item_variant_id),
      purchase_date = COALESCE($2, purchase_date),
      quantity = COALESCE($3, quantity),
      unit = COALESCE($4, unit),
      cost = COALESCE($5, cost),
      total_cost = COALESCE($6, total_cost),
      vendor = COALESCE($7, vendor)
     WHERE id = $8 RETURNING *`,
    [
      item_variant_id,
      purchase_date,
      quantity,
      unit,
      cost,
      total_cost,
      vendor,
      id
    ]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  await db.query(`UPDATE purchases SET is_deleted = TRUE WHERE id = $1`, [id]);
  return { success: true };
};

exports.getDeleted = async () => {
  const result = await db.query(
    `SELECT p.*, iv.name AS variant_name, iv.unit
     FROM purchases p
     JOIN item_variants iv ON p.item_variant_id = iv.id
     WHERE p.is_deleted = TRUE
     ORDER BY p.id`
  );
  return result.rows;
};

exports.restore = async (id) => {
  const result = await db.query(
    'UPDATE purchases SET is_deleted = FALSE WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};
