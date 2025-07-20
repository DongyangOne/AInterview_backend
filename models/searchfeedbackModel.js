const db = require('../config/database');

// 피드백 검색 
exports.searchFeedbacks = (keyword, callback) => {
   const sql = `SELECT feedback_id, userId, COUNT(feedback_id) as \`조회된 피드백\`,
  title, memo, pin, created_at FROM feedback WHERE title LIKE ? ORDER BY created_at DESC`;
  db.query(sql, [`%${keyword}%`], callback);
};
