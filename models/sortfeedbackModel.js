const db = require('../config/database');

exports.sortFeedbacks = (orderBy, callback) => {
  const sql = `SELECT * FROM feedbacks ORDER BY is_pinned DESC, ${orderBy}`;
  db.query(sql, callback);
};