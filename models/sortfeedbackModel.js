const db = require('../config/database');

exports.sortFeedbacks = (orderBy, callback) => {
  const sql = `SELECT feedback_id, userId, title, memo, pin, created_at FROM feedback ORDER BY pin DESC, ${orderBy}`;
  db.query(sql, callback);
};