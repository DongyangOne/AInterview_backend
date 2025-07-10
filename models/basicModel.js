const pool = require('../config/database');

exports.testQuery = async () => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT "DB Connected Successfully" as message');
    return rows[0];
  } finally {
    connection.release();
  }
};