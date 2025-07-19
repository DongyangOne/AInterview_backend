const connection = require('../config/database');

exports.findById = ({ feedbackId, userId }, callback) => {
  const sql = `
    SELECT feedback_id AS id, title, content, memo, created_at, updated_at
    FROM feedback
    WHERE feedback_id = ? AND userId = ?
  `;
  connection.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};


// 메모 수정
exports.updateMemo = ({ feedbackId, memo, userId }, callback) => {
  const sql = `
    UPDATE feedback
    SET memo = ?, updated_at = NOW()
    WHERE feedback_id = ? AND userId = ?
  `;
  connection.query(sql, [memo, feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};



