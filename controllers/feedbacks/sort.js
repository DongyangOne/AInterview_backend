const db = require('../../config/database');

// 피드백 정렬 (날짜별 정렬, 가나다별 정렬)
exports.sortFeedbacks = (req, res) => {
  const { by } = req.query; 

  // 날짜별 정렬: 최신순
  let orderBy = 'date DESC';

  // 가나다별 정렬: 제목 오름차순
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