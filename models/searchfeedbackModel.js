const db = require('../config/database');

// 피드백 검색 
exports.searchFeedbacks = (keyword, callback) => {
  const sql = "SELECT * FROM feedbacks WHERE title LIKE ? ORDER BY date DESC";
  db.query(sql, [`%${keyword}%`], callback);
};