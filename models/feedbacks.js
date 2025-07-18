const db = require('../config/database');

exports.searchFeedbacks = (keyword, callback) => {
  const sql = "SELECT * FROM feedbacks WHERE title LIKE ? ORDER BY date DESC";
  db.query(sql, [`%${keyword}%`], callback);
};

exports.sortFeedbacks = (by, callback) => {
  let orderBy = 'date DESC';
  if (by === 'alpha') orderBy = 'title ASC';
  const sql = `SELECT * FROM feedbacks ORDER BY is_pinned DESC, ${orderBy}`;
  db.query(sql, callback);
};

exports.pinFeedback = (id, callback) => {
  const sql = "UPDATE feedbacks SET is_pinned = 1 WHERE id = ?";
  db.query(sql, [id], callback);
};

exports.unpinFeedback = (id, callback) => {
  const sql = "UPDATE feedbacks SET is_pinned = 0 WHERE id = ?";
  db.query(sql, [id], callback);
};