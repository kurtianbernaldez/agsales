const db = require('./db');

exports.getAll = async () => {
  const result = await db.query(
    `SELECT o.*, iv.name AS variant_name, iv.unit
     FROM offsets o
     JOIN item_variants iv ON o.item_variant_id = iv.id
     WHERE o.is_deleted = FALSE
     ORDER BY o.id`
  );
  return result.rows;
};

exports.create = async ({ item_variant_id, branch, description, quantity, offset_date, remarks }) => {
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
    `INSERT INTO offsets (
      item_variant_id, 
      branch,
      description,
      quantity,
      offset_date,
      remarks
    )
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      item_variant_id, 
      branch,
      description,
      quantity || 0,
      offset_date,
      remarks
    ]
  );
  return result.rows[0];
};

exports.update = async (id, { item_variant_id, branch, description, quantity, offset_date, remarks }) => {
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
    `UPDATE offsets SET
      item_variant_id = COALESCE($1, item_variant_id),
      branch = COALESCE($2, branch),
      description = COALESCE($3, description),
      quantity = COALESCE($4, quantity),
      offset_date = COALESCE($5, offset_date),
      remarks = COALESCE($6, remarks)
     WHERE id = $7 RETURNING *`,
    [
      item_variant_id,
      branch,
      description,
      quantity,
      offset_date,
      remarks,
      id
    ]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  await db.query(`UPDATE offsets SET is_deleted = TRUE WHERE id = $1`, [id]);
  return { success: true };
};

exports.getDeleted = async () => {
  const result = await db.query(
    `SELECT o.*, iv.name AS variant_name, iv.unit
     FROM offsets o
     JOIN item_variants iv ON o.item_variant_id = iv.id
     WHERE o.is_deleted = TRUE
     ORDER BY o.id`
  );
  return result.rows;
};

exports.restore = async (id) => {
  const result = await db.query(
    'UPDATE offsets SET is_deleted = FALSE WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};
