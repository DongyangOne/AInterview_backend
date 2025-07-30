const FeedbackModel = require('../../models/allModel');

exports.searchFeedbacks = (req, res) => {
  const { keyword } = req.query;
  FeedbackModel.searchFeedbacks(keyword, (err, result) => {
    if (err) {
      console.error('피드백 검색 오류:', err);
      return res.status(500).json({ error: err.message });
    }
       res.status(200).json({ success: true, data: result });
  });
};
