const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'agsales',
  password: 'ipiwnfmpa1212',
  port: 5432, // default PostgreSQL port
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
