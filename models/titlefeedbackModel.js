const connection = require('../config/database');

// 제목조회
exports.findTitleById = ({ feedbackId, userId }, callback) => {
  const sql = "SELECT title FROM feedback WHERE feedback_id = ? AND userId = ?";
  connection.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};

// 8번: 제목 수정
exports.updateTitle = ({ feedbackId, title, userId }, callback) => {
  const sql = "UPDATE feedback SET title = ?, updated_at = NOW() WHERE feedback_id = ? AND userId = ?";
  connection.query(sql, [title, feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};