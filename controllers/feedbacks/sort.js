const db = require('../../config/database');

// 피드백 정렬 (날짜순, 가나다순)
exports.sortFeedbacks = (req, res) => {
  const { by } = req.query; 

  let orderBy = 'date DESC';
  if (by === 'alpha') orderBy = 'title ASC';

  const sql = `SELECT * FROM feedbacks ORDER BY is_pinned DESC, ${orderBy}`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('정렬 오류:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};
