const pool = require('../../config/database');

exports.findAll = async ({ userId, search, sort }) => {
  const connection = await pool.getConnection();
  try {
    let sql = `
      SELECT 
        feedback_id as id, 
        title, 
        content,
        memo
      FROM feedback 
      WHERE userId = ?
    `;
    
    const queryParams = [userId];

    if (search) {
      sql += " AND title LIKE ?";
      queryParams.push(`%${search}%`);
    }

    if (sort === 'alpha') {
      sql += " ORDER BY title ASC";
    } else {
      sql += " ORDER BY feedback_id DESC";
    }

    const [rows] = await connection.query(sql, queryParams);
    return rows;
  } finally {
    connection.release();
  }
};

exports.updateTitle = async ({ feedbackId, title, userId }) => {
  const connection = await pool.getConnection();
  try {
    const sql = `
      UPDATE feedback 
      SET title = ? 
      WHERE feedback_id = ? AND userId = ?
    `;
    const [result] = await connection.query(sql, [title, feedbackId, userId]);
    return result;
  } finally {
    connection.release();
  }
};