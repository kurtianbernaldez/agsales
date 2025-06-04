const { isValidElement } = require('react');
const db = require('./db');

exports.getAll = async () => {
  const result = await db.query(
    `SELECT iv.*, it.name AS type_name
     FROM item_variants iv
     JOIN item_types it ON iv.item_type_id = it.id
     WHERE iv.is_deleted = FALSE
     ORDER BY iv.id`
  );
  return result.rows;
};

exports.create = async ({ name, item_type_id, unit }) => {
  const check = await db.query(
    `SELECT * FROM item_variants 
     WHERE name = $1 AND item_type_id = $2 AND unit = $3 AND is_deleted = TRUE`,
    [name, item_type_id, unit]
  );

  if (check.rows.length > 0) {
    const undelete = await db.query(
      `UPDATE item_variants SET is_deleted = FALSE 
       WHERE id = $1 RETURNING *`,
      [check.rows[0].id]
    );
    return undelete.rows[0];
  }

  const result = await db.query(
    `INSERT INTO item_variants (name, item_type_id, unit)
     VALUES ($1, $2, $3) RETURNING *`,
    [name, item_type_id, unit]
  );
  return result.rows[0];
};


exports.update = async (id, { name, item_type_id, unit }) => {
  const result = await db.query(
    `UPDATE item_variants
     SET name = $1, item_type_id = $2, unit = $3
     WHERE id = $4 RETURNING *`,
     [name, parseInt(item_type_id), unit, id]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  await db.query(`UPDATE item_variants SET is_deleted = TRUE WHERE id = $1`, [id]);
  return { success: true};
};