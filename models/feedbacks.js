const db = require('../config/database');

exports.sortFeedbacks = (by, callback) => {
  let orderBy = 'date DESC';
  if (by === 'alpha') orderBy = 'title ASC';
  const sql = `SELECT * FROM feedbacks ORDER BY is_pinned DESC, ${orderBy}`;
  db.query(sql, callback);
};