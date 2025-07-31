const connection = require('../config/database');

exports.findAllByUserId = (userId, callback) => {
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

exports.findById = (feedbackId, userId, callback) => {
  const sql = `
    SELECT feedback_id AS id, userId, title, content, memo, created_at
    FROM feedback
    WHERE feedback_id = ? AND userId = ?
  `;
  connection.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};

exports.deleteById = (feedbackId, userId, callback) => {
  const sql = "DELETE FROM feedback WHERE feedback_id = ? AND userId = ?";
  connection.query(sql, [feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

exports.findTitleById = (feedbackId, userId, callback) => {
  const sql = "SELECT title FROM feedback WHERE feedback_id = ? AND userId = ?";
  connection.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};

exports.updateTitle = (feedbackId, userId, title, callback) => {
  const sql = "UPDATE feedback SET title = ?, updated_at = NOW() WHERE feedback_id = ? AND userId = ?";
  connection.query(sql, [title, feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

exports.findMemoById = (feedbackId, userId, callback) => {
  const sql = "SELECT memo FROM feedback WHERE feedback_id = ? AND userId = ?";
  connection.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};

exports.updateMemo = (feedbackId, userId, memo, callback) => {
  const sql = "UPDATE feedback SET memo = ?, updated_at = NOW() WHERE feedback_id = ? AND userId = ?";
  connection.query(sql, [memo, feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};
