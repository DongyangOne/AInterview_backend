const connection = require('../config/database');

exports.findAllByUserId = ({ userId }, callback) => {
  const sql = `
    SELECT feedback_id AS id, title, memo, created_at
    FROM feedback
    WHERE userId = ?
    ORDER BY created_at DESC
  `;
  connection.query(sql, [userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};

