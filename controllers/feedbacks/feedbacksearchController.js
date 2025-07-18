const FeedbackModel = require('../../models/feedbacks');

exports.searchFeedbacks = (req, res) => {
  const { keyword } = req.query;
  FeedbackModel.searchFeedbacks(keyword, (err, rows) => {
    if (err) {
      console.error('검색 오류:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};