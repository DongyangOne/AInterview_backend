const db = require('../../config/database');

//  피드백 상단 고정
exports.pinFeedback = (req, res) => {
  const { id } = req.params; 
  const sql = "UPDATE feedbacks SET is_pinned = 1 WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('상단 고정 오류:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: '피드백 상단 고정 완료' });
  });
};

//  피드백 상단 고정 해제
exports.unpinFeedback = (req, res) => {
  const { id } = req.params; 
  const sql = "UPDATE feedbacks SET is_pinned = 0 WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('상단 고정 해제 오류:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: '피드백 상단 고정 해제 완료' });
  });
};