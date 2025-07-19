const connection = require('../config/database');




exports.findMemoById = ({ feedbackId, userId }, callback) => {
  const sql = "SELECT memo FROM feedback WHERE feedback_id = ? AND userId = ?";
  connection.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};

exports.updateMemo = ({ feedbackId, memo, userId }, callback) => {
  const sql = "UPDATE feedback SET memo = ?, updated_at = NOW() WHERE feedback_id = ? AND userId = ?";
  connection.query(sql, [memo, feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};
