const db = require('./db');

exports.getAll = async () => {
  const result = await db.query('SELECT * FROM item_types WHERE is_deleted = FALSE ORDER BY id');
  return result.rows;
};

exports.create = async (name) => {
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