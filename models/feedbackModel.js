const connection = require('../config/database');

exports.findById = ({ feedbackId, userId }, callback) => {
  const sql = `
    SELECT 
      feedback_id AS id, 
      userId, 
      title, 
      content, 
      memo, 
      created_at
    FROM feedback
    WHERE feedback_id = ? AND userId = ?
  `;
  connection.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};