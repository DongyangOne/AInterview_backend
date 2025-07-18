const FeedbackModel = require('../../models/sortfeedbackModel');

exports.sortFeedbacks = (req, res) => {
  const { by } = req.query;
  FeedbackModel.sortFeedbacks(by, (err, rows) => {
    if (err) {
      console.error('피드백 정렬 오류:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};