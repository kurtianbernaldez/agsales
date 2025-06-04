const db = require('./db');

exports.getAll = async () => {
  const result = await db.query('SELECT * FROM item_types WHERE is_deleted = FALSE ORDER BY id');
  return result.rows;
};

exports.create = async (name) => {
  // Check for soft-deleted duplicate
  const check = await db.query(
    'SELECT * FROM item_types WHERE name = $1 AND is_deleted = TRUE',
    [name]
  );

  if (check.rows.length > 0) {
    // Undelete the existing row
    const undelete = await db.query(
      'UPDATE item_types SET is_deleted = FALSE WHERE id = $1 RETURNING *',
      [check.rows[0].id]
    );
    return undelete.rows[0]; // ✅ return restored item
  }

  // Otherwise, insert new
  const result = await db.query(
    'INSERT INTO item_types (name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
};


exports.update = async (id, name) => {
  const result = await db.query(
    'UPDATE item_types SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
    await db.query('UPDATE item_types SET is_deleted = TRUE WHERE id = $1', [id]);
    return {success: true};
};

exports.getDeleted = async () => {
  const result = await db.query('SELECT * FROM item_types WHERE is_deleted = TRUE ORDER BY id');
  return result.rows;
};

exports.restore = async (id) => {
  const result = await db.query('UPDATE item_types SET is_deleted = FALSE WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

exports.truncate = async () => {
  await db.query('TRUNCATE TABLE item_types RESTART IDENTITY CASCADE');
  return { success: true };
};