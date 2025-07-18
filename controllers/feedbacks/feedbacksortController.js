const FeedbackModel = require('../../models/sortfeedbackModel');

exports.sortFeedbacks = (req, res) => {
  const { by } = req.query;
  
  let orderBy;
  if (by === 'alpha') {
    orderBy = 'title ASC';      // 가나다순
  } else {
    orderBy = 'date DESC';      // 날짜순
  }

  FeedbackModel.sortFeedbacks(orderBy, (err, rows) => {
    if (err) {
      console.error('피드백 정렬 오류:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};