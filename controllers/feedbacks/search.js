const db = require('../../config/database');

// 피드백 검색 
exports.searchFeedbacks = (req, res) => {
  const { keyword } = req.query; 

  const sql = "SELECT * FROM feedbacks WHERE title LIKE ? ORDER BY date DESC";
  db.query(sql, [`%${keyword}%`], (err, rows) => {
    if (err) {
      console.error('검색 오류:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};